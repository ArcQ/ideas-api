import { FlatList, Image, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

import Avatar from './Avatar';
import AppPropTypes from '../utils/AppPropTypes';
import colors from '../constants/colors';

const getStyle = () => ({
  searchIcon: { paddingTop: 5 },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  container: { paddingHorizontal: 15, flex: 1 },
  userContainer: { flexDirection: 'row', paddingHorizontal: 15 },
});

function SelectUserItem(props) {
  const style = getStyle();
  return (
    <View style={style.userContainer}>
      <Avatar
        source={{
          uri: props.item.imageUrl,
        }}
      />
      <Text>{props.item.username}</Text>
      <Text>{props.item.firstName}</Text>
      <Image source={props.item.imageUrl} />
    </View>
  );
}

SelectUserItem.propTypes = {
  item: AppPropTypes.user,
};

export default function SelectUsers(props) {
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
      <FlatList data={props.users} renderItem={SelectUserItem} />
    </View>
  );
}

SelectUsers.propTypes = {
  users: PropTypes.arrayOf(AppPropTypes.user),
  queryOnChange: PropTypes.func,
};
