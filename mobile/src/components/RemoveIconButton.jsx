import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import AppPropTypes from '../utils/AppPropTypes';
import colors from '../constants/colors';
import { LARGE_HIT_SLOP } from '../constants/HitSlops';

const style = {
  closeButton: {
    backgroundColor: colors.fail,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginRight: 5,
  },
  closeButtonIcon: {
    color: colors.black20,
    paddingBottom: 4,
  },
};

export default function CloseIconButton(props) {
  return (
    <TouchableOpacity
      hitSlop={LARGE_HIT_SLOP}
      style={[style.closeButton, props.style]}
      onPress={props.onRemovePress}
    >
      <AntDesign name="minuscircleo" size={12} color="black" />
    </TouchableOpacity>
  );
}

CloseIconButton.propTypes = {
  onRemovePress: PropTypes.func,
  style: AppPropTypes.style,
};
