import { select } from 'redux-saga/effects';

import { baseSelectors } from './ducks';
import { appSelectors } from '../app/ducks';

export function* getCurrentIdea() {
  const currentLab = yield select(appSelectors.currentLab);

  if (currentLab) {
    return currentLab;
  }

  // wait for lab to come back yield take(labConstants.RECEIVE_MESSAGE);

  return yield select(baseSelectors.currentLab);
}

export function* getCurrentChatId() {
  const { chatId } = yield getCurrentIdea();
  return chatId;
}
