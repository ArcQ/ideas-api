import { Image, Text, View } from 'react-native';
import React from 'react';

import Avatar from './Avatar';
import AppPropTypes from '../utils/AppPropTypes';

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

export default SelectUserItem;
