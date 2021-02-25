// https://sourcegraph.com/github.com/aws-amplify/amplify-js@3206a4fa05588674261ba6ac415c0315560ae968/-/blob/packages/amplify-ui-components/src/common/types/auth-types.ts#L18:16
export default {
  SignUp: 'signup',
  SignOut: 'signout',
  SignIn: 'signin',
  Loading: 'loading',
  SignedOut: 'signedout',
  SignedIn: 'signedin',
  SigningUp: 'signingup',
  ConfirmSignUp: 'confirmSignUp',
  confirmingSignUpCustomFlow: 'confirmsignupcustomflow',
  ConfirmSignIn: 'confirmSignIn',
  confirmingSignInCustomFlow: 'confirmingsignincustomflow',
  VerifyingAttributes: 'verifyingattributes',
  ForgotPassword: 'forgotpassword',
  ResetPassword: 'resettingpassword',
  SettingMFA: 'settingMFA',
  TOTPSetup: 'TOTPSetup',
  CustomConfirmSignIn: 'customConfirmSignIn',
  VerifyContact: 'verifyContact',
};

export const NoAuthMode = 'noAuth';

export const SIGNUP_SCREEN_PARAM = 'signUp';
export const SIGNIN_SCREEN_PARAM = 'signIn';

export const authStatus = {
  SIGN_IN_SUCCESS: 'signIn',
  SIGN_UP_SUCCESS: 'signUp',
  SIGN_OUT_SUCCESS: 'signOut',
  SIGN_IN_FAILURE: 'signIn_failure',
  TOKEN_REFRESH: 'tokenRefresh',
  TOKEN_REFRESH_FAILURE: 'tokenRefresh_failure',
  CONFIGURED: 'configured',
};
