import React from 'react';
import PropTypes from 'prop-types';

import {
  SIGNIN_SCREEN_PARAM,
  SIGNUP_SCREEN_PARAM,
} from '../../constants/amplifyAuthState';
import { AMPLIFY_AUTH } from '../../constants/routes';
import Landing from './Landing';

function LandingContainer(props) {
  const _props = {};

  const methods = {
    onSignInPress: () => {
      props.navigation.navigate(AMPLIFY_AUTH, {
        initialAuthScreen: SIGNIN_SCREEN_PARAM,
      });
    },
    onSignUpPress: () => {
      props.navigation.navigate(AMPLIFY_AUTH, {
        initialAuthScreen: SIGNUP_SCREEN_PARAM,
      });
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
