import { ScrollView } from 'react-native';
import { listenToKeyboardEvents } from 'react-native-keyboard-aware-scroll-view';
import React from 'react';

import AppPropTypes from 'utils/AppPropTypes';

const style = {
  scrollView: { width: '100%' },
  contentContainerStyle: {
    flexGrow: 1,
    width: '100%',
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
      contentContainerStyle={style.contentContainerStyle}
      style={style.scrollView}
      {...restProps}
    />
  );
}

ScrollableAvoidKeyboard.propTypes = {
  contentContainerStyle: AppPropTypes.style,
  style: AppPropTypes.style,
};
