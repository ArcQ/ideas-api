import { Auth, Hub } from 'aws-amplify';
import { fork, put, takeEvery } from 'redux-saga/effects';
import { eventChannel as EventChannel } from 'redux-saga';

import { appActions, appConstants } from './ducks';
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
      console.info('token refresh succeeded');
      break;
    case authStatus.TOKEN_REFRESH_FAILURE:
      console.info('token refresh failed');
      break;
    case authStatus.CONFIGURED:
      console.info('the Auth module is configured');
      break;
    case authStatus.SIGN_OUT:
      console.info('the Auth module is configured');
      break;
    default:
      console.error('Unexpected auth state unhandled');
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

    console.log(jwtToken);
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
