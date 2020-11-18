import { put, fork } from 'redux-saga/effects';

import { baseActions, baseConstants } from './ducks';
import { getCurrentChatId } from './helpers';
import { watchActionsLatest } from '../../utils/watchActions';
import apiService, { apiCall } from '../../services/api/apiService';

function* getChatForBase() {
  const currentChatId = yield getCurrentChatId();
  yield apiCall(
    {
      call: apiService.core.get,
      *onSuccess(response) {
        yield put(
          baseActions.receiveChat({
            messages: response.messages,
          }),
        );
      },
    },
    `/v1/chats/${currentChatId}`,
  );
}

function* init() {
  yield getChatForBase();
}

export default function* basesSaga() {
  // yield init();
  // yield fork(watchActionsLatest, [
  //   [baseConstants.GET_CHAT_FOR_BASE, getChatForBase],
  // ]);
}
