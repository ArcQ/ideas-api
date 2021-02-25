import produce from 'immer';

import amplifyAuthState from '../../constants/amplifyAuthState';
import {
  createConstantsAndActions,
  createSelectorsAndState,
} from '../../utils/reduxHelpers';

export const appNamespace = 'app';

const constArr = ['SIGNED_IN', 'SIGN_UP', 'SIGNED_OUT'];

export const {
  constants: appConstants,
  actions: appActions,
} = createConstantsAndActions(appNamespace, constArr);

const { initialState, selectors } = createSelectorsAndState(appNamespace, {
  signedIn: false,
  currentLab: {
    id: '6034f8e2-df82-11ea-87d0-0242ac130003',
    chatId: 'cf4aeae1-cda7-41f3-adf7-9b2bb377be7d',
  },
});

export const appSelectors = {
  ...selectors,
};

const c = appConstants;

const appReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case c.SIGNED_IN: {
      state.signedIn = true;
      return state;
    }
    case c.SIGNED_OUT: {
      state.signedOut = true;
      return state;
    }
    default:
      return state;
  }
});

export default appReducer;
