import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import CustomGiftedChatComposerContainer from './components/CustomGiftedChatComposer/CustomGiftedChatComposerContainer';
import AppPropTypes, { MessagePropType } from '../../utils/AppPropTypes';
import ChatHeader from './ChatHeader';

import AccessoryBar from '../../components/AccessoryBar';
import Message from '../../components/Message';

const DEFAULT_INPUT_TOOLBAR_HEIGHT = 44;
const IDEA_INPUT_TOOLBAR_HEIGHT = 100;

export default function Chat({
  chatId,
  messages,
  sendMessage,
  getChatForBase,
  onIdeaItemPress,
  onDeletePreviewPress,
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
        minInputToolbarHeight={
          idea ? IDEA_INPUT_TOOLBAR_HEIGHT : DEFAULT_INPUT_TOOLBAR_HEIGHT
        }
        renderComposer={(_props) => (
          <CustomGiftedChatComposerContainer
            onIdeaItemPress={onIdeaItemPress}
            onDeletePreviewPress={onDeletePreviewPress}
            idea={idea}
            {..._props}
          />
        )}
        renderSend={(_props) => null}
        user={{ _id: 1 }}
      />
    </>
  );
}

Chat.propTypes = {
  getChatForBase: PropTypes.func,
  onIdeaItemPress: PropTypes.func,
  onDeletePreviewPress: PropTypes.func,
  sendMessage: PropTypes.func,
  messages: PropTypes.arrayOf(MessagePropType),
  chatId: PropTypes.string,
  idea: AppPropTypes.idea,
};
