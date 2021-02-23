import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { Authenticator } from '@knotfive/aws-amplify-react-native';
import defaultSignupFields from '@knotfive/aws-amplify-react-native/dist/Auth/common/default-sign-up-fields';
import SignIn from '@knotfive/aws-amplify-react-native/dist/Auth/SignIn';
import ConfirmSignIn from '@knotfive/aws-amplify-react-native/dist/Auth/ConfirmSignIn';
import ConfirmSignUp from '@knotfive/aws-amplify-react-native/dist/Auth/ConfirmSignUp';
import VerifyContact from '@knotfive/aws-amplify-react-native/dist/Auth/VerifyContact';
import SignUp from '@knotfive/aws-amplify-react-native/dist/Auth/SignUp';
import ForgotPassword from '@knotfive/aws-amplify-react-native/dist/Auth/ForgotPassword';
import RequireNewPassword from '@knotfive/aws-amplify-react-native/dist/Auth/RequireNewPassword';
import Greetings from '@knotfive/aws-amplify-react-native/dist/Auth/Greetings';

export default function AmplifyAuth(props) {
  return (
    <Authenticator authState={props.authState}>
      <SignIn />
      <ConfirmSignIn />
      <VerifyContact />
      <SignUp />
      <ConfirmSignUp />
      <ForgotPassword />
      <RequireNewPassword />
      <Greetings />
    </Authenticator>
  );
}

AmplifyAuth.propTypes = {};
