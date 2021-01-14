import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import AppPropTypes from '../../../utils/AppPropTypes';
import { MINI_HIT_SLOP } from '../../../constants/hitSlops';
import colors from '../../../constants/colors';

export default function DeleteButton(props) {
  return (
    <TouchableOpacity
      hitSlop={MINI_HIT_SLOP}
      onPress={props.onPress}
      style={props.style}
    >
      <AntDesign name="delete" size={20} color={colors.black20} />
    </TouchableOpacity>
  );
}

DeleteButton.propTypes = {
  onPress: PropTypes.func,
  style: AppPropTypes.style,
};
