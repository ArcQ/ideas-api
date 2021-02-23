import React from 'react';
import PropTypes from 'prop-types';

import {
  AMPLIFY_AUTH,
  SIGNIN_PARAM,
  SIGNUP_PARAM,
} from '../../constants/routes';
import Landing from './Landing';

function LandingContainer(props) {
  const _props = {};

  const methods = {
    onSignInPress: () => {
      props.navigation.push(AMPLIFY_AUTH, { authScreen: SIGNIN_PARAM });
    },
    onSignUpPress: () => {
      props.navigation.push(AMPLIFY_AUTH, { authScreen: SIGNUP_PARAM });
    },
    continueOnPress: () => {
      // props.navigation.push(AMPLIFY_AUTH, { authScreen: SIGNUP_PARAM });
    },
  };

  return <Landing {...{ ..._props, ...methods }} />;
}

LandingContainer.propTypes = {
  navigation: PropTypes.object,
};

export default LandingContainer;
