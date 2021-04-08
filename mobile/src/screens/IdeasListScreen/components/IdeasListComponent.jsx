import { Animated, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import AppPropTypes from '../../../utils/AppPropTypes';
import IdeaListEmptyState from './IdeaListEmptyState';
import colors from '../../../constants/colors';
import IdeaItem from './IdeaItem';
import SwipeableRow from '../../../components/SwipeableRow';

const style = {
  flatList: {
    backgroundColor: colors.white,
    marginTop: 80,
  },
};

export default function IdeasListComponent(props) {
  if (!props.ideaList) {
    return null;
  }
  return (
    <FlatList
      ListEmptyComponent={<IdeaListEmptyState />}
      data={props.ideaList}
      keyExtractor={(item) => item.node.__id}
      style={style.flatList}
      contentContainerStyle={{
        paddingTop: 150,
        paddingBottom: 150,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: props.offset } } }],
        { useNativeDriver: false },
      )}
      renderItem={({ item }) =>
        props.isEditable ? (
          <SwipeableRow onSwipeableRightOpen={props.onSwipeableRightOpen}>
            <IdeaItem
              item={item.node}
              CustomStatusComponent={props.CustomStatusComponent}
              ideaItemOnPress={() => props.ideaItemOnPress(item.node.id)}
              shareIdeaInChat={props.shareIdeaInChat}
            />
          </SwipeableRow>
        ) : (
          <IdeaItem
            shareIdeaInChat={props.shareIdeaInChat}
            ideaItemOnPress={props.ideaItemOnPress}
            item={item.node}
          />
        )
      }
    />
  );
}

IdeasListComponent.propTypes = {
  CustomStatusComponent: PropTypes.func,
  onSwipeableRightOpen: PropTypes.func,
  isEditable: PropTypes.bool,
  offset: PropTypes.object,
  ideaItemOnPress: PropTypes.func,
  shareIdeaInChat: PropTypes.func,
  ideaList: PropTypes.arrayOf(AppPropTypes.LabPropType),
};
