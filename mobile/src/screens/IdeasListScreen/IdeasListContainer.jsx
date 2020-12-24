import React from 'react';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';

import IdeasList from './IdeasList';
import { CREATE_IDEA_ROUTE } from '../../constants/routes';
import { NavigationPropType } from '../../utils/types';

const baseQuery = graphql`
  query BaseQuery {
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
  const baseQueryProps = useQuery(baseQuery);
  // console.log('props', baseQueryProps);
  const _props = { baseQueryProps };

  const methods = {
    goToCreateRoute: () => props.navigation.navigate(CREATE_IDEA_ROUTE),
  };

  return <IdeasList {...{ ..._props, ...methods }} />;
}

IdeasListScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

export default IdeasListScreenContainer;
