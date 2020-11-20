import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import colors from '../../../constants/colors';
import IdeaItem from './IdeaItem';
import SwipeableRow from '../../../components/SwipeableRow';

const style = {
  flatList: {
    backgroundColor: colors['basic-100'],
  },
};

export default function IdeasList(props) {
  return (
    <FlatList
      data={props.baseQueryProps?.props?.allIdeas?.edges}
      keyExtractor={(item) => item.node.id}
      style={style.flatList}
      renderItem={({ item }) =>
        props.isEditable ? (
          <SwipeableRow
            key={item.node.id}
            onSwipeableRightOpen={props.onSwipeableRightOpen}
          >
            <IdeaItem
              item={item.node}
              CustomStatusComponent={props.CustomStatusComponent}
              onListItemPress={props.onListEditableItemPress}
            />
          </SwipeableRow>
        ) : (
          <IdeaItem item={item.node} onListItemPress={props.onListItemPress} />
        )
      }
    />
  );
}

IdeasList.propTypes = {
  CustomStatusComponent: PropTypes.func,
  onSwipeableRightOpen: PropTypes.func,
  onListItemPress: PropTypes.func,
  onListEditableItemPress: PropTypes.func,
  isEditable: PropTypes.bool,
  baseQueryProps: PropTypes.object,
};
