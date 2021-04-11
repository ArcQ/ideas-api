import { Auth } from 'aws-amplify';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import DrawerContent, { drawerContentQuery } from './DrawerContent';
import {
  CREATE_LAB_ROUTE,
  EDIT_LAB_ROUTE,
  HOME_ROUTE,
  INVITE_TO_LAB_ROUTE,
  JOIN_LAB_ROUTE,
  PROFILE_ROUTE,
} from '../constants/routes';
import AppPropTypes from '../utils/AppPropTypes';
import { threadActions } from '../store/thread/ducks';
import { appActions, appSelectors } from '../store/app/ducks';

export const drawerContentContainerQuery = graphql`
  query DrawerContentQuery {
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
                  username
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
  const drawerContentQueryProps = useLazyLoadQuery(
    drawerContentQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  const myLabs = drawerContentQueryProps?.myLabs?.edges;

  const _props = {
    chatId: props.currentLab.chatId,
    myLabs,
  };

  const methods = {
    onHomePress: () => {
      props.navigation.navigate(HOME_ROUTE);
    },
    onInviteToLabPress: () => {
      props.navigation.navigate(INVITE_TO_LAB_ROUTE);
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
      props.setCurrentLab(labNode);
      props.navigation.closeDrawer();
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContentContainer);
