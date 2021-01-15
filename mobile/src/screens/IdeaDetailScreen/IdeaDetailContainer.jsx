import { useMutation, useQuery } from 'relay-hooks';
import { graphql } from 'react-relay';
import React from 'react';
import PropTypes from 'prop-types';

import { parseUuid } from '../../utils/idUtil';
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
        firstName
        lastName
        imageUrl
      }
      desc
      title
      notes
    }
  }
`;

const deleteIdeaMutation = graphql`
  mutation IdeaDetailContainerDeleteMutation($id: ID!) {
    deleteIdea(id: $id) {
      ok
    }
  }
`;

function IdeaDetailContainer(props) {
  const ideaByIdQueryProps = useQuery(ideaByIdQuery, {
    ideaId: 'SWRlYU5vZGU6NGViOWNiOTMtYjExNi00M2RhLWFmNjgtOTNiOTJhMjAwNGNl',
  });
  const [deleteIdea, { loading }] = useMutation(deleteIdeaMutation, {
    onCompleted: ({ deleteIdea }) => {
      console.log(deleteIdea);
    },
  });
  const idea = ideaByIdQueryProps?.data?.idea;
  const _props = { idea };

  const methods = {
    onClosePress: () => {
      props.navigation.goBack();
    },
    onDelete: () => {
      deleteIdea({
        variables: {
          id: parseUuid(idea.id),
        },
      });
    },
    onEdit: () => {},
  };

  return <IdeaDetail {...{ ..._props, ...methods }} />;
}

IdeaDetailContainer.propTypes = {
  navigation: PropTypes.object,
};

export default IdeaDetailContainer;
