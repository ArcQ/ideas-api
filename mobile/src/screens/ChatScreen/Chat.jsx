import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import AppPropTypes from '../../utils/AppPropTypes';
import CustomGiftedChatComposerContainer from '../../components/CustomGiftedChatComposer/CustomGiftedChatComposerContainer';
import ChatHeader from './ChatHeader';
import { MessagePropType } from '../../utils/types';
import AccessoryBar from '../../components/AccessoryBar';
import Message from '../../components/Message';

export default function Chat({
  chatId,
  messages,
  sendMessage,
  getChatForBase,
  idea,
}) {
  useEffect(() => {
    getChatForBase({ chatId });
  }, [chatId, getChatForBase]);

  return (
    <>
      <ChatHeader />
      <GiftedChat
        alwaysShowSend
        messages={messages}
        onSend={(msgs) => sendMessage(msgs)}
        renderAccessory={(_props) => <AccessoryBar {..._props} />}
        renderMessage={(_props) => <Message {..._props} />}
        renderComposer={(_props) => (
          <CustomGiftedChatComposerContainer idea={idea} {..._props} />
        )}
        renderSend={(_props) => null}
        user={{ _id: 1 }}
      />
    </>
  );
}

Chat.propTypes = {
  getChatForBase: PropTypes.func,
  sendMessage: PropTypes.func,
  messages: PropTypes.arrayOf(MessagePropType),
  chatId: PropTypes.string,
  idea: AppPropTypes.idea,
};
