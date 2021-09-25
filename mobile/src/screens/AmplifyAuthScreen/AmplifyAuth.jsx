import { Authenticator } from '@knotfive/aws-amplify-react-native/dist/Auth/Authenticator';
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

import envService from '../../services/env/envService';
import AmplifyTheme from '../../constants/AmplifyTheme';

const defaultSignInValues = envService.getDefaultValues('signIn');
const defaultSignUpValues = envService.getDefaultValues('signUp');
const defaultForgotPasswordValues =
  envService.getDefaultValues('forgotPassword');

const signUpFields = [
  {
    displayOrder: 1,
    key: 'username',
    label: 'Username',
    placeholder: 'Username',
    required: true,
    testID: 'aws-amplify__auth--username-input',
  },
  {
    displayOrder: 2,
    key: 'email',
    label: 'Email',
    placeholder: 'Email',
    required: true,
    testID: 'aws-amplify__auth--email-input',
    type: 'email',
  },
  {
    displayOrder: 3,
    key: 'password',
    label: 'Password',
    placeholder: 'Password',
    required: true,
    testID: 'aws-amplify__auth--password-input',
    type: 'password',
  },
  // {
  //   displayOrder: 4,
  //   key: 'confirm-password',
  //   label: 'Confirm Password',
  //   placeholder: 'Confirm Password',
  //   required: true,
  //   testID: 'aws-amplify__auth--password-input-confirm',
  //   type: 'password',
  // },
];

const signUpConfig = {
  header: 'Create a new account',
  signUpFields,
  hideAllDefaults: true,
  noConfirm: true,
};

export default function AmplifyAuth(props) {
  return (
    <Authenticator
      authState={props.initialAuthScreen}
      hideDefault
      theme={AmplifyTheme}
    >
      <SignIn defaultValues={defaultSignInValues} />
      <ConfirmSignIn />
      <VerifyContact />
      <SignUp defaultValues={defaultSignUpValues} signUpConfig={signUpConfig} />
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
