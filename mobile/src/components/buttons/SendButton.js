import { Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Send } from 'react-native-gifted-chat';

import gStyle from '../../constants/gStyle';
import colors from '../../constants/colors';

const SendButton = (props) => {
  const { text } = props;

  const isActive = text.length ? style.btnActive : {};
  const isActiveText = text.length ? style.btnActiveText : {};

  return (
    <Send {...props} containerStyle={style.container}>
      <View style={[style.btn, isActive]}>
        <Text style={[style.btnText, isActiveText]}>Send</Text>
      </View>
    </Send>
  );
};

SendButton.propTypes = {
  // required
  text: PropTypes.string.isRequired,
};

const style = {
  container: {
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: colors.white,
    borderColor: colors.greyTime,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  btnText: {
    ...gStyle.textCiruBold14,
    color: colors.greyTime,
  },
  btnActive: {
    backgroundColor: colors.blueSend,
    borderColor: colors.blueSend,
  },
  btnActiveText: {
    color: colors.white,
  },
};

export default SendButton;
