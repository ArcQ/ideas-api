import Amplify, { I18n } from 'aws-amplify';

import awsconfig from '../../awsconfig.json';

const amplifyConfigure = () => Amplify.configure(awsconfig);

export default {
  init() {
    amplifyConfigure();
    const authScreenLabels = {
      en: {
        'Sign in to your account': 'Welcome Back',
        'Sign Up': 'Create new account',
        'Sign Up Account': 'Create a new account',
      },
    };

    I18n.setLanguage('en');
    I18n.putVocabularies(authScreenLabels);
  },
};
