import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { getFromNow } from '../../../utils/dateUtil';
import gStyle from '../../../constants/gStyle';
import Avatar from '../../../components/Avatar';
import AppPropTypes from '../../../utils/AppPropTypes';

const style = {
  container: {
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 10,
  },
  username: {
    ...gStyle.textBold,
  },
  createdBy: {
    ...gStyle.textThin,
  },
  postedAt: {
    ...gStyle.textThin,
    marginTop: 10,
  },
};

export default function PostedDetails(props) {
  return (
    <View style={style.container}>
      <Avatar
        source={{
          uri: props.createdBy.imageUrl,
        }}
        size={85}
      />
      <View style={style.userDetails}>
        <Text style={style.username} numberOfLines={1} ellipsizeMode="tail">
          {props.createdBy.username}
        </Text>
        <Text style={style.createdBy} numberOfLines={1} ellipsizeMode="tail">
          {props.createdBy.firstName} {props.createdBy.lastName}
        </Text>
        <Text style={style.postedAt} numberOfLines={1} ellipsizeMode="tail">
          Posted {getFromNow(props.createdAt)}
        </Text>
      </View>
    </View>
  );
}

PostedDetails.propTypes = {
  createdBy: AppPropTypes.user,
  createdAt: PropTypes.string,
};
