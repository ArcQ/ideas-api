import produce from 'immer';

import { appConstants } from '../app/ducks';
import {
  createConstantsAndActions,
  createSelectorsAndState,
} from '../../utils/reduxHelpers';

export const threadNamespace = 'thread';

const constArr = [
  'INITIALIZE',
  'SEND_MESSAGE',
  'SEND_MESSAGE_SUCCESS',
  'RECEIVE_MESSAGE',
  'RECEIVE_MESSAGES',
  'SEND_MESSAGE_ERROR',
  'CLOSE',

  // TEMPORARY
  'CLEAR_MESSAGES',
];

export const {
  constants: threadConstants,
  actions: threadActions,
} = createConstantsAndActions(threadNamespace, constArr);

// TEMPORARY
const initialMessages = [];

// TODO, nest messages under chat
const { initialState, selectors } = createSelectorsAndState(threadNamespace, {
  isSending: false,
  recipient: {},
  messages: {},
  // these are objects for now, but they really should be sets, it's giving unexpected behaviour in immer
  messageSets: {},
  presences: {},
  users: {},
});

export const threadSelectors = {
  ...selectors,
  latestMessage: (chatId) => (state) =>
    state[threadNamespace].messages[chatId]?.[0],
  messagesByChatId: (chatId) => (state) => selectors.messages(state)[chatId],
};

const c = threadConstants;

const transformMessageResToMessage = ({ messageRes, user }) => ({
  _id: messageRes?.id,
  text: messageRes?.text,
  createdAt: messageRes?.inserted_at,
  user: {
    _id: user?.authKey,
    name: user?.username,
    avatar: user?.imageUrl,
  },
});

const pushMessageIfNotFound = (chatId, messageRes, state) => {
  if (!state.messageSets[chatId][messageRes.id]) {
    const user = state.users?.[messageRes.user_auth_key];
    state.messageSets[chatId][messageRes.id] = true;
    const message = transformMessageResToMessage({
      messageRes,
      user,
    });
    state.messages[chatId].unshift(message);
  }
};

// Messages are sent by default as short, and no progress bar, if an error returns or
// TODO A large message like an attachment needs to show progress + status
const threadReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case c.SEND_MESSAGE:
      state.isSending = true;
      return state;
    case c.SEND_MESSAGE_SUCCESS:
      state.isSending = false;
      return state;
    case c.CLEAR_MESSAGES:
      return initialState;
    case c.SEND_MESSAGE_ERROR:
      state.isSending = false;
      return state;
    case c.PRESENCE_CHANGE:
      state.isSending = false;
      return state;
    case c.RECEIVE_MESSAGES: {
      const { chatId } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = initialMessages;
      }
      if (!state.messageSets[chatId]) {
        state.messageSets[chatId] = {};
      }
      action.payload.messages.forEach((messageRes) =>
        pushMessageIfNotFound(chatId, messageRes, state),
      );
      return state;
    }
    case c.RECEIVE_MESSAGE: {
      // this takes a user object, but we should actually just call user by id, else user changes are hard to propagate
      const { chatId } = action.payload;

      if (!state.messages[chatId]) {
        state.messages[chatId] = initialMessages;
      }
      if (!state.messageSets[chatId]) {
        state.messageSets[chatId] = {};
      }

      pushMessageIfNotFound(chatId, action.payload.message, state);
      return state;
    }
    case appConstants.SET_CURRENT_LAB: {
      state.users = action.payload.labmemberSet.edges.reduce(
        (users, edge) => ({
          ...users,
          [edge.node.user.authKey]: edge.node.user,
        }),
        state.users,
      );
      return state;
    }
    default:
      return state;
  }
});

export default threadReducer;
