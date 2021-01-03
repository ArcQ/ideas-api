import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import SendButton from '../../components/buttons/SendButton';
import ChatHeader from './ChatHeader';
import { MessagePropType } from '../../utils/types';
import AccessoryBar from '../../components/AccessoryBar';
import Message from '../../components/Message';

export default function ChatContainer({
  chatId,
  messages,
  sendMessage,
  getChatForBase,
}) {
  useEffect(() => {
    getChatForBase({ chatId });
  }, [chatId, getChatForBase]);

  messages = [
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ];

  return (
    <>
      <ChatHeader />
      <GiftedChat
        alwaysShowSend
        messages={messages}
        onSend={(msgs) => sendMessage(msgs)}
        renderAccessory={(_props) => <AccessoryBar {..._props} />}
        renderMessage={(_props) => <Message {..._props} />}
        renderSend={(_props) => null}
        user={{ _id: 1 }}
      />
    </>
  );
}

ChatContainer.propTypes = {
  getChatForBase: PropTypes.func,
  sendMessage: PropTypes.func,
  messages: PropTypes.arrayOf(MessagePropType),
  chatId: PropTypes.string,
};
