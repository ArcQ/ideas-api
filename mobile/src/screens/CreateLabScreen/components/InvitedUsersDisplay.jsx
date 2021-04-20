import PropTypes from 'prop-types';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import SelectUserItem from '../../../components/SelectUserItem';
import AppPropTypes from '../../../utils/AppPropTypes';
import gStyle from '../../../constants/gStyle';

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

export default function InvitedUsersDisplay(props) {
  const style = getStyle();
  return (
    <View style={style.labContainer}>
      <FlatList
        data={props.value || []}
        renderItem={({ item }) =>
          item.isUser ? (
            <TouchableOpacity onPress={() => props.onItemPress(item)}>
              <SelectUserItem item={item} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => props.onItemPress(item)}>
              <Text>item.email</Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

InvitedUsersDisplay.propTypes = {
  value: AppPropTypes.array,
  onItemPress: PropTypes.func,
};
