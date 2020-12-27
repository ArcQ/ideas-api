import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import colors from '../constants/colors';

export default function CloseButton(props) {
  return (
    <TouchableOpacity
      hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
      onPress={props.onPress}
      style={props.style}
    >
      <AntDesign name="closecircle" size={24} color={colors.black20} />
    </TouchableOpacity>
  );
}

CloseButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
};
