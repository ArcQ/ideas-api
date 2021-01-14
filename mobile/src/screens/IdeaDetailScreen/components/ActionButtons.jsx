import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import AppPropTypes from '../../../utils/AppPropTypes';
import colors from '../../../constants/colors';

const style = {
  container: {
    position: 'absolute',
    bottom: 35,
    right: 35,
    padding: 12,
    marginVertical: 10,
    borderColor: colors.black20,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
  },
};

export default function ActionButtons(props) {
  return (
    <View style={style.container}>
      <EditButton style={{ paddingLeft: 5 }} />
      <DeleteButton style={{ paddingHorizontal: 5 }} />
    </View>
  );
}

ActionButtons.propTypes = {
  createdBy: AppPropTypes.user,
  createdAt: PropTypes.string,
};
