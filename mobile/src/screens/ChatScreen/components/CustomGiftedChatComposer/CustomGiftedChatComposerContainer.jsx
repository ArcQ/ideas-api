// this is built off of a fork of the component inside of react native gifted chat
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Colors from '../../../../constants/colors';
import AppPropTypes from '../../../../utils/AppPropTypes';
import CustomGiftedChatComposer from './CustomGiftedChatComposer';

const MIN_COMPOSER_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
  web: 34,
});
const DEFAULT_PLACEHOLDER = 'Type a message...';

export default class CustomGiftedChatComposerContainer extends React.Component {
  constructor() {
    super();
    this.contentSize = false;
  }

  onContentSizeChange = (e) => {
    const { contentSize } = e.nativeEvent;

    // Support earlier versions of React Native on Android.
    if (!contentSize) {
      return;
    }

    if (
      !this.contentSize ||
      (this.contentSize &&
        (this.contentSize.width !== contentSize.width ||
          this.contentSize.height !== contentSize.height))
    ) {
      this.contentSize = contentSize;
      if (this.props.onInputSizeChanged && this.contentSize) {
        this.props.onInputSizeChanged(this.contentSize);
      }
    }
  };

  onChangeText = (text) => {
    if (this.props.onTextChanged) {
      this.props.onTextChanged(text);
    }
  };

  render = () => (
    <CustomGiftedChatComposer
      {...this.props}
      contentSize={this.contentSize}
      idea={this.props.idea}
      onIdeaItemPress={this.props.onIdeaItemPress}
      onDeletePreviewPress={this.props.onDeletePreviewPress}
      onChangeText={this.onChangeText}
      onContentSizeChange={this.onContentSizeChange}
    />
  );
}

CustomGiftedChatComposerContainer.defaultProps = {
  composerHeight: MIN_COMPOSER_HEIGHT,
  text: '',
  placeholderTextColor: Colors.black40,
  placeholder: DEFAULT_PLACEHOLDER,
  textInputProps: null,
  multiline: true,
  disableComposer: false,
  textInputStyle: {},
  textInputAutoFocus: false,
  keyboardAppearance: 'default',
  onTextChanged: () => {},
  onInputSizeChanged: () => {},
};

CustomGiftedChatComposerContainer.propTypes = {
  composerHeight: PropTypes.number,
  onTextChanged: PropTypes.func,
  onInputSizeChanged: PropTypes.func,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  onIdeaItemPress: PropTypes.func,
  onDeletePreviewPress: PropTypes.func,
  textInputProps: PropTypes.object,
  onTextChanged: PropTypes.func,
  multiline: PropTypes.bool,
  disableComposer: PropTypes.bool,
  textInputStyle: AppPropTypes.style,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
};
