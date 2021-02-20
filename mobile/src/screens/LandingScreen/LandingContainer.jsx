import React from 'react';
import PropTypes from 'prop-types';

import Landing from './Landing';

function LandingContainer(props) {
  const _props = {};

  const methods = {
    onSignInPress: () => {},
    onSignUpPress: () => {},
  };

  return <Landing {...{ ..._props, ...methods }} />;
}

LandingContainer.propTypes = {
  navigation: PropTypes.object,
};

export default LandingContainer;
