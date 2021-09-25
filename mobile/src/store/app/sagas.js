import { Hub } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { fork, put, takeEvery } from 'redux-saga/effects';
import { eventChannel as EventChannel } from 'redux-saga';

import { appActions } from './ducks';
import { authStatus } from '../../constants/amplifyAuthState';
import { errorActions } from '../error/ducks';

function* subscribeAuthState(event) {
  switch (event?.payload?.event) {
    case authStatus.SIGN_IN_SUCCESS:
      yield put(
        appActions.signIn({
          type: authStatus.SIGN_IN_SUCCESS,
          user: {
            ...event.payload.data.attributes,
          },
        }),
      );
      break;
    case authStatus.SIGN_UP_SUCCESS:
      yield put(
        appActions.signUp({
          type: authStatus.SIGN_UP_SUCCESS,
          user: {
            ...event.payload.data.attributes,
          },
        }),
      );
      break;
    case authStatus.SIGN_OUT_SUCCESS:
      yield put(appActions.signOut());
      break;
    case authStatus.SIGN_IN_FAILURE:
      yield put(
        errorActions.setError({
          type: authStatus.SIGN_IN_FAILURE,
          error: {},
        }),
      );
      break;
    case authStatus.TOKEN_REFRESH:
      break;
    case authStatus.TOKEN_REFRESH_FAILURE:
      break;
    case authStatus.CONFIGURED:
      break;
    case authStatus.SIGN_OUT:
      break;
    default:
      console.error('Unexpected auth state unhandled'); // eslint-disable-line no-console
  }
}

function* startChannel() {
  const hubChannel = new EventChannel((emitter) => {
    Hub.listen('auth', (event) => {
      emitter(event);
    });

    return () => {};
  });

  yield takeEvery(hubChannel, subscribeAuthState);
}

export default function* appSaga() {
  try {
    const {
      idToken: { jwtToken, payload },
    } = yield Auth.currentSession();

    yield put(
      appActions.finishLoad({
        signedIn: true,
        accessToken: {
          jwtToken,
        },
        user: {
          username: payload['cognito:username'],
          email: payload.email,
        },
      }),
    );
  } catch (e) {
    yield put(appActions.finishLoad({ signedIn: false }));
  }

  yield fork(startChannel);
}
