import { useFragment } from 'react-relay';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';

import IdeaFragment from '../../../relay/fragments/IdeaFragment';
import AppPropTypes from '../../../utils/AppPropTypes';
import { getFromNow } from '../../../utils/dateUtil';
import { MINI_HIT_SLOP } from '../../../constants/hitSlops';
import gstyle from '../../../constants/gStyle';
import colors from '../../../constants/colors';

const getStyle = () => ({
  title: {
    ...gstyle.textBold,
    paddingVertical: 5,
  },
  desc: {
    ...gstyle.textThin20,
    paddingBottom: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  listItem: {
    overflow: 'hidden',
    borderRadius: 20,
    paddingRight: 0,
    marginTop: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.black10,
  },
  itemText: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  replyButton: {
    backgroundColor: colors.black15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
});

export default function IdeaItem(props) {
  const style = getStyle();
  const item = useFragment(IdeaFragment, props.item);

  return (
    <View style={style.listItem}>
      <TouchableOpacity
        hitSlop={MINI_HIT_SLOP}
        onPress={() => {
          props.ideaItemOnPress(item.id);
        }}
        style={style.itemText}
      >
        <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={style.desc} numberOfLines={4} ellipsizeMode="tail">
          {item.desc}
        </Text>
        <Text style={style.createdAt}>{getFromNow(item.createdAt)}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={MINI_HIT_SLOP}
        onPress={() => {
          props.shareIdeaInChat(item);
        }}
        style={style.replyButton}
      >
        <FontAwesome5 name="share" size={20} color={colors.pink} />
      </TouchableOpacity>
    </View>
  );
}

IdeaItem.propTypes = {
  item: AppPropTypes.idea,
  ideaItemOnPress: PropTypes.func,
  shareIdeaInChat: PropTypes.func,
};
