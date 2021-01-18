import { connect } from 'react-redux';
import { useMutation, useQuery } from 'relay-hooks';
import { graphql } from 'react-relay';
import React from 'react';
import PropTypes from 'prop-types';

import { parseUuid } from '../../utils/idUtil';
import { alertActions } from '../../store/alert/ducks';
import IdeaDetail from './IdeaDetail';
import { deleteIdeaSuccessMessage } from '../../store/alert/alertMessages';

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
  const ideaId = props.route.params?.ideaId;
  // console.log(props.route);
  const ideaByIdQueryProps = useQuery(ideaByIdQuery, {
    ideaId,
  });
  const [deleteIdea, { loading }] = useMutation(deleteIdeaMutation, {
    onCompleted: ({ deleteIdea }) => {
      // console.log(deleteIdea);
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
      props.navigation.goBack();
      setTimeout(() => {
        props.setSuccessMessage(deleteIdeaSuccessMessage);
      }, 400);
    },
    onEdit: () => {},
  };

  return <IdeaDetail {...{ ..._props, ...methods }} />;
}

IdeaDetailContainer.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  setSuccessMessage: PropTypes.func,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setSuccessMessage: alertActions.setSuccessMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IdeaDetailContainer);
