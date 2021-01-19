// this is built off of a fork of the component inside of react native gifted chat
import { Platform, Text, View } from 'react-native';
import React from 'react';

import colors from '../../constants/colors';
import { getFromNow } from '../../utils/dateUtil';
import AppPropTypes from '../../utils/AppPropTypes';

const style = {
  ideaPreview: {
    overflow: 'hidden',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    flex: 1,
    height: 100,
    flexDirection: 'row',
    backgroundColor: colors.black10,
  },
  flex: 1,
  marginLeft: 10,
  fontSize: 16,
  lineHeight: 16,
  ...Platform.select({
    web: {
      paddingTop: 6,
      paddingLeft: 4,
    },
  }),
  marginTop: Platform.select({
    ios: 6,
    android: 0,
    web: 6,
  }),
  marginBottom: Platform.select({
    ios: 5,
    android: 3,
    web: 4,
  }),
};

export default function IdeaPreview(props) {
  return (
    <View style={style.ideaPreview}>
      <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
        {props.idea.title}
      </Text>
      <Text style={style.desc} numberOfLines={1} ellipsizeMode="tail">
        {props.idea.desc}
      </Text>
      <Text style={style.createdAt}>{getFromNow(props.idea.createdAt)}</Text>
    </View>
  );
}

IdeaPreview.propTypes = {
  idea: AppPropTypes.idea,
};
