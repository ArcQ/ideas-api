import { connect } from 'react-redux';
import { useMutation, usePreloadedQuery } from 'react-relay';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { drawerContentContainerQuery } from '../../navigation/SignedInDrawerNavigator/components/DrawerContentContainer';
import { appActions, appSelectors } from '../../store/app/ducks';
import { threadActions } from '../../store/thread/ducks';
import upsertLabMutation from '../../relay/mutations/upsertLab';
import { QueryContext } from '../../context';
import LabDetail from './LabDetail';

function LabDetailContainer(props) {
  const [createLab, { loading }] = useMutation(upsertLabMutation, {
    onCompleted: ({ idea }) => {},
  });
  const { drawerQueryRef, loadIdeasListQuery } = useContext(QueryContext);
  const myLabs = usePreloadedQuery(drawerContentContainerQuery, drawerQueryRef)
    ?.myLabs?.edges;

  const currentLab = myLabs
    ? myLabs.find((edge) => edge.node.id === props.currentLab.id)
    : undefined;

  const methods = {};
  const _props = {
    lab: currentLab,
  };

  return <LabDetail {...{ ..._props, ...methods }} />;
}

LabDetailContainer.propTypes = {
  navigation: PropTypes.object,
  currentLab: PropTypes.shape({
    id: PropTypes.string,
    chatId: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  currentLab: appSelectors.currentLab(state),
});

const mapDispatchToProps = {
  setCurrentLab: appActions.setCurrentLab,
  sendMessage: threadActions.sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabDetailContainer);
