import { compose } from 'redux';
import React, { useContext } from 'react';
import { graphql, usePreloadedQuery } from 'react-relay';
import { Auth } from '@aws-amplify/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  CREATE_LAB_ROUTE,
  EDIT_LAB_ROUTE,
  HOME_ROUTE,
  INVITE_TO_LAB_ROUTE,
  JOIN_LAB_ROUTE,
  LAB_DETAIL_ROUTE,
  PROFILE_ROUTE,
} from '../../../constants/routes';
import suspenseContextWrapper from '../../../wrappers/suspenseContextWrapper';
import { QueryContext } from '../../../context';
import DrawerContent from './DrawerContent';
import AppPropTypes from '../../../utils/AppPropTypes';
import { threadActions } from '../../../store/thread/ducks';
import { appActions, appSelectors } from '../../../store/app/ducks';

export const drawerContentContainerQuery = graphql`
  query DrawerContentContainerQuery {
    myLabs {
      edges {
        node {
          id
          code
          createdBy {
            id
            username
          }
          name
          imageUrl
          chatId
          labmemberSet {
            edges {
              node {
                user {
                  id
                  username
                  imageUrl
                  authKey
                }
              }
            }
          }
        }
      }
    }
  }
`;

function DrawerContentContainer(props) {
  const { drawerQueryRef, loadIdeasListQuery } = useContext(QueryContext);
  const myLabs = usePreloadedQuery(drawerContentContainerQuery, drawerQueryRef)
    ?.myLabs?.edges;

  const _props = {
    chatId: props.currentLab.chatId,
    myLabs,
  };

  const methods = {
    onHomePress: () => {
      props.navigation.navigate(HOME_ROUTE);
    },
    onLabDetailsPress: () => {
      props.navigation.navigate(LAB_DETAIL_ROUTE);
    },
    onFeatureRequestPress: () => {
      props.navigation.navigate(INVITE_TO_LAB_ROUTE);
    },
    onCreateLabPress: () => {
      props.navigation.navigate(CREATE_LAB_ROUTE);
    },
    onJoinLabsPress: () => {
      props.navigation.navigate(JOIN_LAB_ROUTE);
    },
    onEditLabsPress: () => {
      props.navigation.navigate(EDIT_LAB_ROUTE);
    },
    onLabButtonPress: (labNode) => {
      props.navigation.closeDrawer();
      props.setCurrentLab(labNode);
      props.navigation.navigate(HOME_ROUTE);
      loadIdeasListQuery(
        { lab_Id: labNode.id },
        { fetchPolicy: 'store-and-network' },
      );
    },
    onProfilePress: () => {
      props.navigation.navigate(PROFILE_ROUTE);
    },
    onLogoutPress: async () => {
      try {
        await Auth.signOut();
      } catch (error) {
        // eslint-disable-next-line
        console.info('error signing out: ', error);
      }
    },
  };

  return <DrawerContent {...{ ..._props, ...methods }} />;
}

DrawerContentContainer.propTypes = {
  navigation: AppPropTypes.navigation,
  sendMessage: PropTypes.func,
  setCurrentLab: PropTypes.func,
  currentLab: AppPropTypes.lab,
  messages: PropTypes.arrayOf(AppPropTypes.message),
};

const mapStateToProps = (state) => ({
  currentLab: appSelectors.currentLab(state),
});

const mapDispatchToProps = {
  setCurrentLab: appActions.setCurrentLab,
  sendMessage: threadActions.sendMessage,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  suspenseContextWrapper('drawerQueryRef'),
)(DrawerContentContainer);
