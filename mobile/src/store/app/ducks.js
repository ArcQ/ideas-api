import produce from 'immer';

import {
  createConstantsAndActions,
  createSelectorsAndState,
} from '../../utils/reduxHelpers';

export const appNamespace = 'app';

const constArr = [
  'FINISH_LOAD',
  'SIGN_IN',
  'SIGN_UP',
  'SIGN_OUT',
  'SET_CURRENT_LAB',
];

export const {
  constants: appConstants,
  actions: appActions,
} = createConstantsAndActions(appNamespace, constArr);

const { initialState, selectors } = createSelectorsAndState(appNamespace, {
  isLoading: false,
  signedIn: false,
  user: undefined,
  currentLab: {
    id: 'e27c629f-c1d1-49f1-b3eb-b67e6b7c1c2a',
    chatId: 'cf4aeae1-cda7-41f3-adf7-9b2bb377be7d',
  },
  // currentLab: undefined,
});

export const appSelectors = {
  ...selectors,
};

const c = appConstants;

const appReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case c.FINISH_LOAD: {
      state.signedIn = action.payload.signedIn;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.loading = false;
      return state;
    }
    case c.SET_CURRENT_LAB: {
      state.currentLab = {
        id: action.payload.id,
        chatId: action.payload.chatId,
      };
      return state;
    }
    case c.SIGN_IN: {
      state.signedIn = true;
      state.user = action.payload.user;
      return state;
    }
    case c.SIGN_OUT: {
      state.signedIn = false;
      return state;
    }
    default:
      return state;
  }
});

export default appReducer;
