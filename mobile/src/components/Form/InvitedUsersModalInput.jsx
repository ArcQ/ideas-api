import { View } from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FilterBar from '../../screens/IdeasListScreen/components/FilterBar';
import AppPropTypes from '../../utils/AppPropTypes';
import colors from '../../constants/colors';
import gStyle from '../../constants/gStyle';

export const style = {
  hover: {
    postion: 'absolute',
    bottom: 0,
  },
  overlay: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 0,
    backgroundColor: colors['basic-100'],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8.46,
    elevation: 9,
  },
  closeButton: (topInset) => ({
    position: 'absolute',
    right: 20,
    top: 10 + topInset,
    zIndex: 100,
  }),
  addUsersButton: {
    ...gStyle.grayBorder,
  },
};

export default function InvitedUsersModalInput(props) {
  return (
    <View style={style.overlay}>
      <FilterBar />
    </View>
  );
}

InvitedUsersModalInput.propTypes = {
  InputComponent: PropTypes.func.isRequired,
  ...AppPropTypes.formInput,
};
