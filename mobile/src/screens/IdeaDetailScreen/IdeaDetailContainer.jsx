import { useQuery } from 'relay-hooks';
import { graphql } from 'react-relay';
import React from 'react';
import PropTypes from 'prop-types';

import IdeaDetail from './IdeaDetail';

const ideaByIdQuery = graphql`
  query IdeaDetailContainerQuery($ideaId: ID!) {
    idea(id: $ideaId) {
      id
      createdAt
      updatedAt
      lab {
        id
        imageUrl
      }
      createdBy {
        username
        imageUrl
      }
      desc
      title
      notes
    }
  }
`;

function IdeaDetailContainer(props) {
  const ideaByIdQueryProps = useQuery(ideaByIdQuery, {
    ideaId: 'SWRlYU5vZGU6NGViOWNiOTMtYjExNi00M2RhLWFmNjgtOTNiOTJhMjAwNGNl',
  });
  const idea = ideaByIdQueryProps?.data?.idea;
  const _props = { idea };

  const methods = {
    onClosePress: () => {
      props.navigation.goBack();
    },
  };

  return <IdeaDetail {...{ ..._props, ...methods }} />;
}

IdeaDetailContainer.propTypes = {
  navigation: PropTypes.object,
};

export default IdeaDetailContainer;
