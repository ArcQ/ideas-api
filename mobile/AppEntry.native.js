import { registerRootComponent } from 'expo';
import { LogBox, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import envService from './src/services/env/envService';

import App from './src/App';

if (Platform.OS !== 'web') {
  LogBox.ignoreLogs([
    'No current user',
    'Warning: Functions are not valid as a React child.',
  ]);
  enableScreens();
}
export default function init() {
  if (envService.getConfig().storybook) {
    // eslint-disable-next-line global-require
    const StoryBook = require('./storybook').default;
    registerRootComponent(StoryBook);
  } else {
    registerRootComponent(App);
  }
}
