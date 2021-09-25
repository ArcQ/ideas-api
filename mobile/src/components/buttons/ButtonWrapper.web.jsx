import { TouchableOpacity } from 'react-native';
import React from 'react';

import AppPropTypes from '../../utils/AppPropTypes';
import { MINI_HIT_SLOP } from '../../constants/hitSlops';

export default function ButtonWrapper(props) {
  return (
    <TouchableOpacity
      hitSlop={MINI_HIT_SLOP}
      onPress={props.onPress}
      style={props.style}
    >
      {props.children}
    </TouchableOpacity>
  );
}

ButtonWrapper.propTypes = AppPropTypes.buttonWrapper;
