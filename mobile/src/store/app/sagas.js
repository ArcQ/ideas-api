import { all, put, take, takeEvery } from 'redux-saga/effects';
import { Hub } from 'aws-amplify';

import { errorActions } from '../error/ducks';
import { getCurrentChatId } from '../base/helpers';

function* subscribeAuthState(event) {
  switch (event) {
    case 'signIn':
      console.log('user signed in');
      break;
    case 'signUp':
      console.log('user signed up');
      break;
    case 'signOut':
      console.log('user signed out');
      break;
    case 'signIn_failure':
      yield put(
        errorActions.setError({
          error: e,
        }),
      );
      break;
    case 'tokenRefresh':
      console.log('token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      console.log('token refresh failed');
      break;
    case 'configured':
      console.log('the Auth module is configured');
    default:
      console.error('Unexpected auth state unhandled');
  }
}

function* startChannel() {
  const currentChatId = yield getCurrentChatId();
  const channelIds = [currentChatId];

  if (channelIds.length === 0) {
    return;
  }

  const messagesChannel = new EventChannel((emitter) => {
    Hub.listen('auth', () => {
      emitter();
    });

    return () => {};
  });

  yield all([takeEvery(messagesChannel, subscribeAuthState)]);
}

export default function* appSaga() {
  yield startChannel();
}
