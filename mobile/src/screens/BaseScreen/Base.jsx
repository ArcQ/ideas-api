import React from 'react';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';

import { CREATE_IDEA_ROUTE } from '../../constants/routes';
import BaseScreen from './BaseScreen';
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

function BaseScreenContainer(props) {
  const baseQueryProps = useQuery(baseQuery);
  // console.log('props', baseQueryProps);
  const _props = { baseQueryProps };

  const methods = {
    goToCreateRoute: () => props.navigation.navigate(CREATE_IDEA_ROUTE),
  };

  return <BaseScreen {...{ ..._props, ...methods }} />;
}

BaseScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

export default BaseScreenContainer;
