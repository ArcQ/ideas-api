import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import RoundButtonSvg from '../../assets/images/RoundButtonSvg';
import AppPropTypes from '../../utils/AppPropTypes';
import { MINI_HIT_SLOP } from '../../constants/hitSlops';
import colors from '../../constants/colors';

export default function ButtonWrapper(props) {
  return (
    <TouchableOpacity
      hitSlop={MINI_HIT_SLOP}
      onPress={props.onPress}
      style={props.style}
    >
      <RoundButtonSvg />
      <AntDesign name="user" size={props.size} color={colors.black20} />
    </TouchableOpacity>
  );
}

ButtonWrapper.defaultProps = {
  size: 24,
};

ButtonWrapper.propTypes = {
  onPress: PropTypes.func,
  style: AppPropTypes.style,
  size: PropTypes.number,
};
