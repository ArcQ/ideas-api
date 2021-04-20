import React, { useContext, useMemo } from 'react';
import { graphql, usePreloadedQuery } from 'react-relay';
import { Animated, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { QueryContext } from '../../../context';
import suspenseContextWrapper from '../../../wrappers/suspenseContextWrapper';
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

export const ideasListQuery = graphql`
  query IdeasListComponentQuery($lab_Id: UUID) {
    myIdeas(lab_Id: $lab_Id) {
      edges {
        node {
          ...IdeaFragment
        }
      }
    }
  }
`;

function IdeasListComponent(props) {
  const { ideasListQueryRef } = useContext(QueryContext);
  const data = usePreloadedQuery(ideasListQuery, ideasListQueryRef);
  const ideaList = data?.myIdeas?.edges;
  const {
    offset,
    isEditable,
    onSwipeableRightOpen,
    CustomStatusComponent,
    ideaItemOnPress,
    shareIdeaInChat,
  } = props;

  return useMemo(
    () => (
      <FlatList
        ListEmptyComponent={<IdeaListEmptyState />}
        data={ideaList}
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
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false },
        )}
        renderItem={({ item }) =>
          isEditable ? (
            <SwipeableRow onSwipeableRightOpen={onSwipeableRightOpen}>
              <IdeaItem
                item={item.node}
                CustomStatusComponent={CustomStatusComponent}
                ideaItemOnPress={() => ideaItemOnPress(item.node.id)}
                shareIdeaInChat={shareIdeaInChat}
              />
            </SwipeableRow>
          ) : (
            <IdeaItem
              shareIdeaInChat={shareIdeaInChat}
              ideaItemOnPress={ideaItemOnPress}
              item={item.node}
            />
          )
        }
      />
    ),
    [
      ideaList,
      offset,
      isEditable,
      onSwipeableRightOpen,
      CustomStatusComponent,
      ideaItemOnPress,
      shareIdeaInChat,
    ],
  );
}

IdeasListComponent.propTypes = {
  CustomStatusComponent: PropTypes.func,
  onSwipeableRightOpen: PropTypes.func,
  isEditable: PropTypes.bool,
  offset: PropTypes.object,
  ideaItemOnPress: PropTypes.func,
  shareIdeaInChat: PropTypes.func,
  ideaList: PropTypes.arrayOf(AppPropTypes.lab),
};

export default suspenseContextWrapper('ideasListQueryRef')(IdeasListComponent);
