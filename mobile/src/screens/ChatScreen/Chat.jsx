import PropTypes from 'prop-types';
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import AppPropTypes from '../../utils/AppPropTypes';
import CustomGiftedChatComposerContainer from './components/CustomGiftedChatComposer/CustomGiftedChatComposerContainer';
import ChatHeader from './ChatHeader';
import AccessoryBar from './components/AccessoryBar';
import Message from './components/Message';

const DEFAULT_INPUT_TOOLBAR_HEIGHT = 44;
const IDEA_INPUT_TOOLBAR_HEIGHT = 100;

export default function Chat({
  messages,
  sendMessage,
  onIdeaItemPress,
  onDeletePreviewPress,
  idea,
}) {
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
  messages: PropTypes.arrayOf(AppPropTypes.message),
  chatId: PropTypes.string,
  idea: AppPropTypes.idea,
};
