import { Authenticator } from '@knotfive/aws-amplify-react-native';
import PropTypes from 'prop-types';
import React from 'react';
import SignIn from '@knotfive/aws-amplify-react-native/dist/Auth/SignIn';
import ConfirmSignIn from '@knotfive/aws-amplify-react-native/dist/Auth/ConfirmSignIn';
import ConfirmSignUp from '@knotfive/aws-amplify-react-native/dist/Auth/ConfirmSignUp';
import VerifyContact from '@knotfive/aws-amplify-react-native/dist/Auth/VerifyContact';
import SignUp from '@knotfive/aws-amplify-react-native/dist/Auth/SignUp';
import ForgotPassword from '@knotfive/aws-amplify-react-native/dist/Auth/ForgotPassword';
import RequireNewPassword from '@knotfive/aws-amplify-react-native/dist/Auth/RequireNewPassword';
import Greetings from '@knotfive/aws-amplify-react-native/dist/Auth/Greetings';
import defaultSignupFields from '@knotfive/aws-amplify-react-native/dist/Auth/common/default-sign-up-fields';

import envService from '../../services/env/envService';
import AmplifyTheme from '../../constants/AmplifyTheme';

const defaultSignInValues = envService.getDefaultValues('signIn');
const defaultSignUpValues = envService.getDefaultValues('signUp');
const defaultForgotPasswordValues = envService.getDefaultValues(
  'forgotPassword',
);
const signUpFields = defaultSignupFields.slice(-1);

export default function AmplifyAuth(props) {
  return (
    <Authenticator
      authState={props.initialAuthScreen}
      hideDefault
      theme={AmplifyTheme}
      signUpConfig={{ signUpFields }}
    >
      <SignIn defaultValues={defaultSignInValues} />
      <ConfirmSignIn />
      <VerifyContact />
      <SignUp defaultValues={defaultSignUpValues} />
      <ConfirmSignUp />
      <ForgotPassword defaultValues={defaultForgotPasswordValues} />
      <RequireNewPassword />
      <Greetings />
    </Authenticator>
  );
}

AmplifyAuth.propTypes = {
  initialAuthScreen: PropTypes.string,
};
