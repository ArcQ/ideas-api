import { Image, Text, View } from 'react-native';
import React from 'react';

import gStyle from '../constants/gStyle';
import Avatar from './Avatar';
import AppPropTypes from '../utils/AppPropTypes';

const getStyle = () => ({
  labContainer: {
    ...gStyle.grayBorder,
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginTop: 15,
    marginLeft: 10,
  },
  authorDesc: {
    marginBottom: 10,
    ...gStyle.textThin10,
  },
  name: {
    marginBottom: 10,
    ...gStyle.textBook30,
  },
  author: {
    marginBottom: 20,
    ...gStyle.textBook20,
  },
  joinButton: { borderRadius: 10 },
});

export default function SelectLabItem(props) {
  const style = getStyle();
  return (
    <View style={style.labContainer}>
      <Avatar
        source={{
          uri: props.item.imageUrl,
        }}
      />
      <View style={style.textContainer}>
        <Text style={style.name}>{props.item.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.authorDesc}>Creator: </Text>
          <Text style={style.author}>{props.item.createdByUsername}</Text>
        </View>
      </View>
      <Image source={props.item.imageUrl} />
    </View>
  );
}

SelectLabItem.propTypes = {
  item: AppPropTypes.lab,
};
