import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import React from 'react';

import gStyle from '../../../constants/gStyle';
import AppPropTypes from '../../../utils/AppPropTypes';
import { getFormattedDate } from '../../../utils/dateUtil';

const style = {
  container: {
    ...gStyle.grayBorder,
    padding: 15,
    marginVertical: 10,
    borderRadius: 30,
  },
};

export default function PostedDetails(props) {
  return (
    <View style={style.container}>
      <Image
        style={style.tinyLogo}
        source={{
          uri: props.createdBy.imageUrl,
        }}
      />
      <Text style={style.createdBy} numberOfLines={1} ellipsizeMode="tail">
        {props.createdBy.username}
      </Text>
      <Text style={style.createdBy} numberOfLines={1} ellipsizeMode="tail">
        {props.createdBy.lastName}
      </Text>
      <Text>,</Text>
      <Text style={style.createdBy} numberOfLines={1} ellipsizeMode="tail">
        {props.createdBy.firstName}
      </Text>
      <Text style={style.createdAt}>{getFormattedDate(props.createdAt)}</Text>
    </View>
  );
}

PostedDetails.propTypes = {
  createdBy: AppPropTypes.user,
  createdAt: PropTypes.string,
};
