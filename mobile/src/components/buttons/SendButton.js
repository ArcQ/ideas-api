import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import PropTypes from 'prop-types';
import { Send } from 'react-native-gifted-chat';

import gStyle from '../../constants/gStyle';
import colors from '../../constants/colors';

const SendButton = (props) => {
  const { text } = props;

  const isActive = text.length ? style.btnActive : {};

  return (
    <Send {...props} containerStyle={style.container}>
      <View style={[style.btn, isActive]}>
        <FontAwesome
          name="send-o"
          size={22}
          color={isActive ? colors.black50 : colors.green}
        />
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
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  btnText: {
    ...gStyle.textCiruBold14,
    color: colors.greyTime,
  },
  btnActiveText: {
    color: colors.white,
  },
};

export default SendButton;
