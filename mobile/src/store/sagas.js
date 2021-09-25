import Auth from '@aws-amplify/auth';
import { take, all, fork, cancel } from 'redux-saga/effects';

import envService from '../services/env/envService';
import { retryHoc } from '../utils/reduxHelpers';
import { appConstants } from './app/ducks';
import threadSaga from './thread/sagas';
import appSaga from './app/sagas';

const MAX_TRIES = 3;
const RETRY_DELAY = 200;
// import profileSaga from './profile/sagas';

const defaultSagas = [appSaga];

const signedInSagas = [
  // ---plop_append_saga---
  threadSaga,
  // pushTokenSaga,
  // creditConsentSaga,
  // profileSaga,
];

const retry = retryHoc(MAX_TRIES, RETRY_DELAY);

export default function* rootSaga() {
  if (envService.getConfig().storybook) {
    return;
  }
  yield retry(function* () {
    // TODO, only fail if n failures within a certain timespan
    try {
      yield fork(function* () {
        yield all(defaultSagas.map((saga) => retry(saga)));
      });

      while (true) {
        const { accessToken } = yield Auth.currentSession();

        if (!accessToken) {
          yield take(appConstants.SIGN_IN);
        }

        const signedInTasks = yield fork(function* () {
          yield all(signedInSagas.map((saga) => retry(saga)));
        });

        yield take(appConstants.SIGN_OUT);

        yield cancel(signedInTasks);
      }
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console
    }
  });
}
