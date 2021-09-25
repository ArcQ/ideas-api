import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import Auth from '@aws-amplify/auth';
import { eventChannel as EventChannel } from 'redux-saga';
import { Connection } from '@knotfive/chatpi-client-js/dist/chatpi-client.module'; // eslint-ignore-line

import { appConstants, appSelectors } from '../app/ducks';
import { threadActions, threadConstants, threadSelectors } from './ducks';
import apiService, { apiCall } from '../../services/api/apiService';
import envService from '../../services/env/envService';

const PRESENCE_CHANGE = 'PRESENCE_CHANGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

function* getCurrentChatId() {
  const currentLab = yield select(appSelectors.currentLab);
  if (!currentLab) {
    const action = yield take(appConstants.SET_CURRENT_LAB);
    return action.chatId;
  }
  return currentLab.chatId;
}

function* getUsers() {
  const chatId = yield getCurrentChatId();
}

function* catchUpMessagesForBase() {
  const chatId = yield getCurrentChatId();
  const messages = yield select(threadSelectors.messagesByChatId(chatId));
  const insertedAt = '2020-09-12T05:29:57';

  if (!messages || messages.length === 0) {
    yield apiCall(
      {
        call: apiService.chat.get,
        *onSuccess(response) {
          yield put(
            threadActions.receiveMessages({
              chatId,
              messages: response.messages,
            }),
          );
        },
      },
      `/v1/chats/${chatId}/messages?query_type=after&inserted_at=${insertedAt}`,
    );
  } else {
    const latestMessage = yield select(threadSelectors.latestMessage(chatId));
    const { createdAt } = latestMessage;
    yield apiCall(
      {
        call: apiService.chat.get,
        *onSuccess(response) {
          yield put(
            threadActions.receiveMessages({
              chatId,
              messages: response.messages,
            }),
          );
        },
      },
      `/v1/chats/${chatId}/messages?query_type=after&inserted_at=${createdAt}`,
    );
  }
}

function* handleSuccessfulChatpiEvent(event) {
  switch (event.type) {
    case PRESENCE_CHANGE:
      // typing indicator vs thread level presence vs app level presence, track all 3
      // yield put(baseActions.presenceChange({ presence: event.presence }));
      break;
    case RECEIVE_MESSAGE: {
      // const user = yield select(baseSelectors.getUser(event.payload.user_id));
      // TODO need to get list of cached users from graphql
      const user = {};
      yield put(
        threadActions.receiveMessage({
          chatId: event.channelId,
          message: event.payload,
          user,
        }),
      );
      break;
    }
    default:
  }
}

// TODO push tokens
//
function* subscribeChatpiEvent(messagesChannel) {
  while (true) {
    const { ok, type, payload, channelId, reason } = yield take(
      messagesChannel,
    );
    if (!ok || !payload) {
      console.warn(reason); //eslint-disable-line
    } else {
      yield handleSuccessfulChatpiEvent({ type, channelId, payload });
    }
  }
}

function* watchForSendMessage(connection, action) {
  const currentChatId = yield getCurrentChatId();
  try {
    connection.sendMessage({
      channelId: currentChatId,
      message: {
        text: action.payload[0].text,
        customDetails: { ideaId: action.payload[0].ideaId },
      },
    });
  } catch (e) {
    console.warn(e); //eslint-disable-line
  }
}

function* watchForChannelClose(channel) {
  yield take([threadConstants.CLOSE]);
  channel.close();
}

function getMessageQuery() {
  const insertedAt = '2020-09-12T05:29:57';
  return { after: insertedAt };
}

function* startChannel() {
  const { accessToken } = yield Auth.currentSession();
  const currentChatId = yield getCurrentChatId();
  const channelIds = [currentChatId];

  if (channelIds.length === 0) {
    return;
  }

  const userToken = '10';

  let connection;

  const messagesChannel = new EventChannel((emitter) => {
    connection = new Connection({
      url: envService.getConfig().chatpiSocketUrl,
      apiKey: envService.getConfig().apiKey,
      messageQuery: { after: getMessageQuery() },
      userToken,
      authorizationToken: accessToken.jwtToken,
      channelIds,
      onPresenceChange: (channelId, presence) => {
        emitter({
          ok: true,
          type: PRESENCE_CHANGE,
          channelId,
          payload: presence,
        });
      },
      onMessageReceive: (channelId, message) => {
        emitter({
          ok: true,
          type: RECEIVE_MESSAGE,
          channelId,
          payload: message,
        });
      },
    });

    connection.watchPresence(currentChatId);

    return () => {
      connection.disconnect();
    };
  });

  yield all([
    call(subscribeChatpiEvent, messagesChannel),
    takeEvery(threadConstants.SEND_MESSAGE, watchForSendMessage, connection),
    takeEvery(threadConstants.CLOSE, watchForChannelClose, connection),
  ]);
}

export default function* threadSaga() {
  // yield put({
  //   type: PURGE,
  //   key: 'reduxState', // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
  //   result: () => null, // Func expected on the submitted action.
  // });
  yield fork(catchUpMessagesForBase);
  yield startChannel();
}
