import { fork, put, takeEvery } from 'redux-saga/effects';
import { eventChannel as EventChannel } from 'redux-saga';
import { Hub } from 'aws-amplify';

import { appActions } from './ducks';
import { authStatus } from '../../constants/amplifyAuthState';
import { errorActions } from '../error/ducks';

function* subscribeAuthState(event) {
  console.log(event);
  console.log(event.payload.data.event);
  switch (event.payload.data.event) {
    case authStatus.SIGN_IN_SUCCESS:
      console.info('user signed in');
      yield put(
        appActions.signIn({
          user: {
            code: authStatus.SIGN_IN_FAILURE,
          },
        }),
      );
      break;
    case authStatus.SIGN_UP_SUCCESS:
      console.log('user signed up');
      appActions.signUp({
        user: {
          code: authStatus.SIGN_IN_FAILURE,
        },
      });
      break;
    case authStatus.SIGN_OUT_SUCCESS:
      console.log('user signed out');
      break;
    case authStatus.SIGN_IN_FAILURE:
      yield put(
        errorActions.setError({
          error: {
            code: authStatus.SIGN_IN_FAILURE,
          },
        }),
      );
      break;
    case authStatus.TOKEN_REFRESH:
      console.info('token refresh succeeded');
      break;
    case authStatus.TOKEN_REFRESH_FAILURE:
      console.info('token refresh failed');
      break;
    case authStatus.CONFIGURED:
      console.info('the Auth module is configured');
      break;
    default:
      console.error('Unexpected auth state unhandled');
  }
}

function* startChannel() {
  console.log('hi');

  const hubChannel = new EventChannel((emitter) => {
    Hub.listen('auth', (event) => {
      emitter(event);
    });

    return () => {};
  });

  yield takeEvery(hubChannel, subscribeAuthState);
}

export default function* appSaga() {
  yield fork(startChannel);
}
