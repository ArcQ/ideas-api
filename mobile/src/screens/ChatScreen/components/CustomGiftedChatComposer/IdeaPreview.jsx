// this is built off of a fork of the component inside of react native gifted chat
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import CloseButton from '../../../../components/buttons/CloseButton';
import { MINI_HIT_SLOP } from '../../../../constants/hitSlops';
import colors from '../../../../constants/colors';
import AppPropTypes from '../../../../utils/AppPropTypes';

const style = {
  ideaPreview: {
    overflow: 'hidden',
    borderRadius: 20,
    padding: 15,
    margin: 10,
    height: 80,
    backgroundColor: colors.black10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16,
  },
  desc: {
    flex: 1,
    fontSize: 14,
    lineHeight: 14,
    paddingTop: 8,
  },
  onClosePress: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 100,
  },
};

export default function IdeaPreview(props) {
  return (
    <TouchableOpacity
      hitSlop={MINI_HIT_SLOP}
      onPress={() => {
        props.onIdeaItemPress(props.idea.id);
      }}
      style={style.itemText}
    >
      <CloseButton
        style={style.onClosePress}
        size={20}
        onPress={props.onDeletePress}
      />
      <View style={style.ideaPreview}>
        <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
          {props.idea.title}
        </Text>
        <Text style={style.desc} numberOfLines={2} ellipsizeMode="tail">
          {props.idea.desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

IdeaPreview.propTypes = {
  idea: AppPropTypes.idea,
  onIdeaItemPress: PropTypes.func,
  onDeletePress: PropTypes.func,
};
