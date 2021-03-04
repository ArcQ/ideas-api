import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import gstyle from '../../../constants/gStyle';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import AppPropTypes from '../../../utils/AppPropTypes';

const style = {
  container: {
    ...gstyle.grayBorder,
    position: 'absolute',
    bottom: 35,
    right: 35,
    padding: 12,
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
  },
};

export default function ActionButtons(props) {
  return (
    <View style={style.container}>
      <EditButton style={{ paddingLeft: 5 }} onPress={props.onEdit} />
      <DeleteButton style={{ paddingHorizontal: 5 }} onPress={props.onDelete} />
    </View>
  );
}

ActionButtons.propTypes = {
  createdBy: AppPropTypes.user,
  createdAt: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};
