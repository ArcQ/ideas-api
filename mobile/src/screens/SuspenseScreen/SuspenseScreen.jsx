import { Platform, Text, View } from 'react-native';
import React from 'react';

import gstyle from '../../constants/gStyle';

const getStyle = () => {
  const style = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      colr: '#000',
      textAlign: 'center',

      ...gstyle.textThin20,
      justifyContent: 'center',
    },
  };
  if (Platform.OS === 'web') {
    style.container.maxWidth = '80rem';
  }
  return style;
};

export default function SuspenseScreen() {
  const style = getStyle();
  return (
    <View style={style.container}>
      <Text style={style.title}>Loading</Text>
    </View>
  );
}
