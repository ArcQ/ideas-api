import React from 'react';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';

import {
  CHAT_ROUTE,
  CREATE_IDEA_ROUTE,
  IDEA_DETAIL_ROUTE,
} from '../../constants/routes';
import IdeasList from './IdeasList';
import { NavigationPropType } from '../../utils/types';

const ideasListQuery = graphql`
  query IdeasListContainerQuery {
    allIdeas {
      edges {
        node {
          id
          createdAt
          updatedAt
          lab {
            id
          }
          desc
          title
          notes
        }
      }
    }
  }
`;

function IdeasListScreenContainer(props) {
  const baseQueryProps = useQuery(ideasListQuery);
  const _props = { baseQueryProps };

  const methods = {
    createIdeaOnPress: () => props.navigation.navigate(CREATE_IDEA_ROUTE),
    goToChatRoute: () => props.navigation.navigate(CHAT_ROUTE),
    ideaItemOnPress: () => props.navigation.navigate(IDEA_DETAIL_ROUTE),
    shareIdeaInChat: () => props.navigation.navigate(CHAT_ROUTE),
  };

  return <IdeasList {...{ ..._props, ...methods }} />;
}

IdeasListScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

export default IdeasListScreenContainer;
