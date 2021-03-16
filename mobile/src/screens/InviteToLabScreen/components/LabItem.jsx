import { Image, Text, View } from 'react-native';
import React from 'react';

import Avatar from '../../../components/Avatar';
import AppPropTypes from '../../../utils/AppPropTypes';
import gStyle from '../../../constants/gStyle';

const getStyle = () => ({
  labContainer: {
    padding: 15,
    borderRadius: 20,
    ...gStyle.flexRowCenterAlign,
  },
  text: {
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
  joinButton: { borderRadius: 10 },
});

export default function LabItem(props) {
  const style = getStyle();
  return (
    <View style={style.labContainer}>
      <Avatar
        size={80}
        source={{
          uri: props.item.imageUrl,
        }}
      />
      <Text style={[gStyle.emphasis, style.text]}>{props.item.name}</Text>
      <Image source={props.item.imageUrl} />
    </View>
  );
}

LabItem.propTypes = {
  item: AppPropTypes.lab,
};
