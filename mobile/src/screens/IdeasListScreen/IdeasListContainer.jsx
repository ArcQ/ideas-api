import React from 'react';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';

import {
  CHAT_ROUTE,
  CREATE_IDEA_ROUTE,
  IDEA_DETAIL_ROUTE,
} from '../../constants/routes';
import IdeasList from './IdeasList';
import { NavigationPropType } from '../../utils/AppPropTypes';

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
    ideaItemOnPress: (ideaId) => {
      props.navigation.navigate(IDEA_DETAIL_ROUTE, {
        ideaId,
      });
    },
    shareIdeaInChat: (idea) => {
      props.navigation.navigate(CHAT_ROUTE, { idea });
    },
  };

  return <IdeasList {...{ ..._props, ...methods }} />;
}

IdeasListScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

export default IdeasListScreenContainer;
