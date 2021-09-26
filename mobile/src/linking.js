import {
  AMPLIFY_AUTH,
  CREATE_LAB_ROUTE,
  EDIT_LAB_ROUTE,
  HOME_ROUTE,
  JOIN_LAB_ROUTE,
  LAB_DETAIL_ROUTE,
  LANDING,
  PROFILE_ROUTE,
} from './constants/routes';

const linking = {
  prefixes: ['http://localhost:3000', 'ideaapp://'],
  config: {
    screens: {
      [LANDING]: '/',
      [AMPLIFY_AUTH]: 'auth/:action',
      [HOME_ROUTE]: 'app',
      [EDIT_LAB_ROUTE]: 'app/edit-lab/:id',
      [LAB_DETAIL_ROUTE]: 'app/lab/:id',
      [JOIN_LAB_ROUTE]: 'app/join-lab',
      [CREATE_LAB_ROUTE]: 'app/create-lab',
      [PROFILE_ROUTE]: 'app/profile',
    },
  },
};

export default linking;
