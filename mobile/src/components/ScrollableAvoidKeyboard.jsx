import { ScrollView } from 'react-native';
import { listenToKeyboardEvents } from 'react-native-keyboard-aware-scroll-view';
import React from 'react';

import customPropTypes from 'utils/customPropTypes';

const style = {
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
};
const KeyboardAwareScrollView = listenToKeyboardEvents({})(ScrollView);
export default function ScrollableAvoidKeyboard({
  contentContainerStyle,
  ...restProps
}) {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      extraScrollHeight={10}
      enableOnAndroid
      bouncesZoom={false}
      alwaysBounceVertical={false}
      alwaysBounceHorizontal={false}
      style={[style.container, style]}
      contentContainerStyle={[style.contentContainer, contentContainerStyle]}
      {...restProps}
    />
  );
}

ScrollableAvoidKeyboard.propTypes = {
  contentContainerStyle: customPropTypes.style,
  style: customPropTypes.style,
};
