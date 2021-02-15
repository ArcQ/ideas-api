import { TextInput, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import colors from '../../../constants/colors';
import gStyle from '../../../constants/gStyle';

const HEADER_HEIGHT = 200;

const getStyle = () => ({
  animatedContainer: (headerHeight) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    margin: 20,
    height: headerHeight,
    background: 'blue',
  }),
  welcomeText: {
    ...gStyle.subTitle,
    marginTop: 10,
    color: colors.black30,
  },
  header: {
    ...gStyle.header,
    marginTop: 20,
  },
});

export default function FilterBar(props) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <AntDesign
        name="search1"
        size={24}
        color={colors.black30}
        style={{ paddingTop: 5 }}
      />
      <TextInput
        style={{
          height: 40,
          borderRadius: 10,
          fontSize: 16,
          flex: 16,
          marginLeft: 15,
        }}
        placeholder="Search Ideas..."
        onChangeText={(text) => {}}
      />
      <AntDesign name="filter" size={24} color={colors.black30} />
    </View>
  );
}

FilterBar.propTypes = {};
