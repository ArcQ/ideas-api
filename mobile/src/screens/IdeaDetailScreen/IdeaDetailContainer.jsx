import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { parseUuid } from '../../utils/idUtil';
import { alertActions } from '../../store/alert/ducks';
import IdeaDetail from './IdeaDetail';
import { deleteIdeaSuccessMessage } from '../../store/alert/alertMessages';

const ideaByIdQuery = graphql`
  query IdeaDetailContainerQuery($ideaId: UUID) {
    idea(id: $ideaId) {
      createdBy {
        ...UserFragment
      }
      ...IdeaFragment
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
  const ideaData = useLazyLoadQuery(
    ideaByIdQuery,
    { ideaId: props.route.params?.ideaId },
    { fetchPolicy: 'store-or-network' },
  );

  const [deleteIdea, isInFlight] = useMutation(deleteIdeaMutation);
  const idea = ideaData?.idea;
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

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setSuccessMessage: alertActions.setSuccessMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IdeaDetailContainer);
