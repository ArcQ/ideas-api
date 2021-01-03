import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { MessagePropType } from '../../utils/types';
import { threadActions, threadSelectors } from '../../store/thread/ducks';
import { baseActions, baseSelectors } from '../../store/base/ducks';
import Chat from './Chat';

function ChatContainer(props) {
  const _props = {
    messages: props.messages,
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
  messages: PropTypes.arrayOf(MessagePropType),
  chatId: PropTypes.string,
};

const mapStateToProps = (state) => {
  const chatId = baseSelectors.currentChatId(state);
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
