import { FlatList, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

import SelectLabItem from './SelectLabItem';
import colors from '../constants/colors';

const getStyle = () => ({
  searchIcon: { paddingTop: 5 },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  container: { paddingHorizontal: 15, flex: 1 },
});

export default function SelectList(props) {
  const style = getStyle();
  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <AntDesign
          name="search1"
          size={24}
          color={colors.black30}
          style={style.searchIcon}
        />
        <TextInput
          style={{
            height: 40,
            borderRadius: 10,
            fontSize: 16,
            flex: 16,
            marginLeft: 15,
          }}
          placeholder="Invite Users..."
          onChangeText={props.queryOnChange}
        />
        <View />
      </View>
      <FlatList data={props.items} renderItem={SelectLabItem} />
    </View>
  );
}

SelectList.propTypes = {
  items: PropTypes.array,
  queryOnChange: PropTypes.func,
};
