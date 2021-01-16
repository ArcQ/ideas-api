import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import React from 'react';

import AppPropTypes from '../../../utils/AppPropTypes';
import colors from '../../../constants/colors';
import { getFormattedDate } from '../../../utils/dateUtil';

const style = {
  container: {
    padding: 15,
    marginVertical: 10,
    borderColor: colors.black20,
    borderWidth: 1,
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
