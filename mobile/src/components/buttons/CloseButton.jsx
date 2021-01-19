import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import AppPropTypes from '../../utils/AppPropTypes';
import { MINI_HIT_SLOP } from '../../constants/hitSlops';
import colors from '../../constants/colors';

export default function CloseButton(props) {
  return (
    <TouchableOpacity
      hitSlop={MINI_HIT_SLOP}
      onPress={props.onPress}
      style={props.style}
    >
      <AntDesign name="closecircle" size={props.size} color={colors.black20} />
    </TouchableOpacity>
  );
}

CloseButton.defaultProps = {
  size: 24,
};

CloseButton.propTypes = {
  onPress: PropTypes.func,
  style: AppPropTypes.style,
  size: PropTypes.number,
};
