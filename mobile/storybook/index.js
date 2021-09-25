import { configure, getStorybookUI } from '@storybook/react-native';

import { loadStories } from './storyLoader';
import loadAssets from '../src/assets/loadAssets';

// TODO this is not completely safe, but acceptable for now since
// it should be much faster than actual stories loading
loadAssets.loadAssetsAsync().then(() => {});

configure(() => {
  loadStories();
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage:
    require('@react-native-async-storage/async-storage').default ||
    require('react-native').AsyncStorage ||
    null,
});

export default StorybookUIRoot;
