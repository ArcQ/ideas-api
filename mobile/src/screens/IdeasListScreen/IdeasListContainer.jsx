import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { appSelectors } from '../../store/app/ducks';
import {
  CHAT_ROUTE,
  CREATE_IDEA_ROUTE,
  IDEA_DETAIL_ROUTE,
} from '../../constants/routes';
import IdeasList from './IdeasList';
import { NavigationPropType } from '../../utils/AppPropTypes';

function IdeasListScreenContainer(props) {
  const _props = {};

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

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  IdeasListScreenContainer,
);
