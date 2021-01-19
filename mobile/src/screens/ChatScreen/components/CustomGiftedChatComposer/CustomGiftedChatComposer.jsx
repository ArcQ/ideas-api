// this is built off of a fork of the component inside of react native gifted chat
import { Platform, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Colors from '../../../../constants/colors';
import AppPropTypes from '../../../../utils/AppPropTypes';
import IdeaPreview from './IdeaPreview';

const MIN_COMPOSER_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
  web: 34,
});
const DEFAULT_PLACEHOLDER = 'Type a message...';
const PLACEHOLDER_WITH_IDEA = 'Make a comment around this idea...';

const styles = {
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
};

export default function CustomGiftedChatComposer(props) {
  return (
    <View style={{ flex: 1 }}>
      {props.idea && (
        <IdeaPreview
          idea={props.idea}
          onIdeaItemPress={props.onIdeaItemPress}
          onDeletePress={props.onDeletePreviewPress}
        />
      )}
      <TextInput
        testID={props.placeholder}
        accessible
        accessibilityLabel={props.placeholder}
        placeholder={props.idea ? PLACEHOLDER_WITH_IDEA : props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        multiline={props.multiline}
        editable={!props.disableComposer}
        onContentSizeChange={props.onContentSizeChange}
        onChangeText={props.onChangeText}
        style={[
          styles.textInput,
          props.textInputStyle,
          {
            height: props.composerHeight,
            ...Platform.select({
              web: {
                outlineWidth: 0,
                outlineColor: 'transparent',
                outlineOffset: 0,
              },
            }),
          },
        ]}
        autoFocus={props.textInputAutoFocus}
        value={props.text}
        enablesReturnKeyAutomatically
        underlineColorAndroid="transparent"
        keyboardAppearance={props.keyboardAppearance}
        {...props.textInputProps}
      />
    </View>
  );
}

CustomGiftedChatComposer.defaultProps = {
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

CustomGiftedChatComposer.propTypes = {
  composerHeight: PropTypes.number,
  text: PropTypes.string,
  idea: AppPropTypes.idea,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  textInputProps: PropTypes.object,
  onTextChanged: PropTypes.func,
  onContentSizeChange: PropTypes.func,
  onIdeaItemPress: PropTypes.func,
  onDeletePreviewPress: PropTypes.func,
  onChangeText: PropTypes.func,
  onInputSizeChanged: PropTypes.func,
  multiline: PropTypes.bool,
  disableComposer: PropTypes.bool,
  textInputStyle: AppPropTypes.style,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
};
