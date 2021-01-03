import { Text, View } from 'react-native';
import React from 'react';

import gStyle from '../../constants/gStyle';
import HomeSwipeLayout from '../../layouts/HomeSwipeLayout';
import colors from '../../constants/colors';

const style = {
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
  },
};

export default function ProfileScreen(props) {
  return (
    <HomeSwipeLayout>
      <View style={style.container}>
        <Text style={style.text}>Profile</Text>
      </View>
    </HomeSwipeLayout>
  );
}

ProfileScreen.propTypes = {};
