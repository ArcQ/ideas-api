import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import AppPropTypes from '../../utils/AppPropTypes';
import { baseActions } from '../../store/base/ducks';
import { appSelectors } from '../../store/app/ducks';
import { MessagePropType } from '../../utils/types';
import { threadActions, threadSelectors } from '../../store/thread/ducks';
import Chat from './Chat';

function ChatContainer(props) {
  const _props = {
    messages: props.messages,
    idea: props?.route?.params?.idea,
    chatId: props.chatId,
  };

  const methods = {
    sendMessage: props.sendMessage,
    getChatForBase: props.getChatForBase,
  };

  return <Chat {...{ ..._props, ...methods }} />;
}

ChatContainer.propTypes = {
  getChatForBase: PropTypes.func,
  sendMessage: PropTypes.func,
  route: AppPropTypes.route,
  messages: PropTypes.arrayOf(MessagePropType),
  chatId: PropTypes.string,
};

const mapStateToProps = (state) => {
  const currentLab = appSelectors.currentLab(state);
  const chatId = currentLab?.chatId;
  return {
    messages: threadSelectors.messagesByChatId(chatId)(state),
    chatId,
  };
};

const mapDispatchToProps = {
  sendMessage: threadActions.sendMessage,
  getChatForBase: baseActions.getChatForBase,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
