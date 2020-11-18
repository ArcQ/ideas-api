import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import CustomProptypes from '../utils/customPropTypes';
import colors from '../constants/colors';

const style = {
  listTitle: {
    paddingVertical: 3,
  },
  listAcessoryText: {
    textAlign: 'right',
    color: colors['text-basic-300'],
  },
  listDesc: {},
  listItem: {
    borderColor: colors['basic-700'],
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 10,
    marginHorizontal: 20,
  },
};

export default function ListItem(props) {
  return (
    <View>
      <Text>hi</Text>
    </View>
  );
}

ListItem.propTypes = {
  CustomStatusComponent: PropTypes.func,
  onListItemPress: PropTypes.func,
  item: CustomProptypes.objectOfString,
};
