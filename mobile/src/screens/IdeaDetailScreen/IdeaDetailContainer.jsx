import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import React from 'react';
import PropTypes from 'prop-types';

import IdeaDetail from './IdeaDetail';

export const ideaByIdQuery = graphql`
  query IdeaDetailContainerQuery($ideaId: ID!) {
    idea(id: $ideaId) {
      id
      createdAt
      updatedAt
      lab {
        id
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
  console.log(idea);
  const _props = { idea };

  const methods = {};

  return <IdeaDetail {...{ ..._props, ...methods }} />;
}

IdeaDetailContainer.propTypes = {
  navigation: PropTypes.object,
};

export default IdeaDetailContainer;
