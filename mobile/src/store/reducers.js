import { combineReducers } from 'redux';

import appReducer, { appConstants, appNamespace } from './app/ducks';
import alertReducer, { alertNamespace } from './alert/ducks';
import errorReducer, { errorNamespace } from './error/ducks';
import threadReducer, { threadNamespace } from './thread/ducks';

// ---plop_append_import---

export const signedInReducers = {
  // ---plop_append_reducer---
  [threadNamespace]: threadReducer,
};

export default function createReducer(asyncReducers) {
  const combinedReducer = combineReducers({
    [appNamespace]: appReducer,
    [alertNamespace]: alertReducer,
    [errorNamespace]: errorReducer,
    ...signedInReducers,
    ...asyncReducers,
  });

  return (state, action) =>
    // state as undefined will reset store
    /* eslint-disable indent */
    combinedReducer(
      action.type === appConstants.SIGNED_OUT
        ? {
            [appNamespace]: undefined,
            [alertNamespace]: undefined,
            [errorNamespace]: undefined,
            [threadNamespace]: undefined,
          }
        : state,
      action,
    );
  /* eslint-enable indent */
}
