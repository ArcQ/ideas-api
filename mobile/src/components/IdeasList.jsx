import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import ListItem from './ListItem';
import SwipeableRow from './SwipeableRow';
import colors from '../constants/colors';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default function IdeasList(props) {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      style={{
        backgroundColor: colors['basic-100'],
      }}
      renderItem={({ item }) =>
        props.isEditable ? (
          <SwipeableRow
            key={item.number}
            onSwipeableRightOpen={props.onSwipeableRightOpen}
          >
            <ListItem
              item={item}
              CustomStatusComponent={props.CustomStatusComponent}
              onListItemPress={props.onListEditableItemPress}
            />
          </SwipeableRow>
        ) : (
          <ListItem item={item} onListItemPress={props.onListItemPress} />
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
};
