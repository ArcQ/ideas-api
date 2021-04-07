import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';

import { appSelectors } from '../../store/app/ducks';
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
  const [loaded, setLoaded] = useState(false);
  const { data, error, retry, isLoading } = useQuery(
    ideasListQuery,
    {
      labId: props.currentLab.id,
    },
    {
      onComplete: (v) => {
        setLoaded(true);
      },
      fetchPolicy: loaded ? 'store-or-network' : 'store-and-network',
    },
  );
  const _props = { baseQueryProps: { data, error, retry, isLoading } };

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
  currentLab: PropTypes.object,
};

const mapStateToProps = (state) => ({
  currentLab: appSelectors.currentLab(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IdeasListScreenContainer);
