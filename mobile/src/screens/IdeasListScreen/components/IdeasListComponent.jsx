import { Animated, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import colors from '../../../constants/colors';
import IdeaItem from './IdeaItem';
import SwipeableRow from '../../../components/SwipeableRow';

const style = {
  flatList: {
    backgroundColor: colors.white,
  },
};

export default function IdeasListComponent(props) {
  return (
    <FlatList
      data={props.baseQueryProps?.data?.allIdeas?.edges}
      keyExtractor={(item) => item.node.id}
      style={style.flatList}
      contentContainerStyle={{
        paddingTop: 250,
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
          <SwipeableRow
            key={item.node.id}
            onSwipeableRightOpen={props.onSwipeableRightOpen}
          >
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
  onListEditableItemPress: PropTypes.func,
  isEditable: PropTypes.bool,
  offset: PropTypes.object,
  ideaItemOnPress: PropTypes.func,
  shareIdeaInChat: PropTypes.func,
};
