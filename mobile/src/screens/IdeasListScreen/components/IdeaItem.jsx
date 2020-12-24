import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import gstyle from '../../../constants/gStyle';
import colors from '../../../constants/colors';

const style = {
  title: {
    ...gstyle.textBold20,
    paddingVertical: 5,
  },
  listAcessoryText: {
    ...gstyle.textBold20,
    textAlign: 'right',
    color: colors['text-basic-300'],
  },
  desc: {
    ...gstyle.textBold20,
    paddingBottom: 10,
  },
  listItem: {
    ...gstyle.textThin20,
    // borderColor: colors['basic-700'],
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 14,
    backgroundColor: 'white',
  },
};

export default function IdeaItem(props) {
  return (
    <View style={style.listItem}>
      <Text style={style.title}>{props.item.title}</Text>
      <Text style={style.desc} numberOfLines={4} ellipsizeMode="tail">
        {props.item.desc}
      </Text>
      <Text style={style.createdAt}>{props.item.createdAt}</Text>
    </View>
  );
}

IdeaItem.propTypes = {
  onItemPress: PropTypes.func,
  item: PropTypes.object,
};
