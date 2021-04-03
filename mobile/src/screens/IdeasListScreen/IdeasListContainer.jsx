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
  query IdeasListContainerQuery($labId: UUID) {
    myIdeas(lab_Id: $labId) {
      edges {
        node {
          id
          createdAt
          updatedAt
          lab {
            id
            name
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
  const baseQueryProps = useQuery(ideasListQuery, {
    labId: 'e27c629f-c1d1-49f1-b3eb-b67e6b7c1c2a',
  });
  const _props = { baseQueryProps };

  console.log(baseQueryProps);

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
