import Amplify, { I18n } from '@aws-amplify/core';

import awsconfig from '../../awsconfig.json';

const amplifyConfigure = () => Amplify.configure(awsconfig);

export default {
  init() {
    amplifyConfigure();
    // const authScreenLabels = {
    //   en: {
    //     'Sign in to your account': 'Welcome Back',
    //     'Sign Up': 'Sign up',
    //     'Sign Up Account': 'Create a new account',
    //     'Sign In on Signup': 'Sign in to my account',
    //   },
    // };

    // I18n.setLanguage('en');
    // I18n.putVocabularies(authScreenLabels);
  },
};
