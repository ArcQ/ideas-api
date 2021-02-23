import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import preloadImages from './images';

// cache images
// /////////////////////////////////////////////////////////////////////////////
const cacheImages = (images) =>
  Object.values(images).map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }

    return Asset.fromModule(image).downloadAsync();
  });

// preload async
// /////////////////////////////////////////////////////////////////////////////
const loadAssetsAsync = async () => {
  // preload assets
  /* eslint-disable */
  const fontAssets = Font.loadAsync({
    circularProBold: require('./fonts/circular-pro-bold.ttf'),
    circularProBook: require('./fonts/circular-pro-book.ttf'),
    larsseitBold: require('./fonts/larsseit-bold.ttf'),
    larsseitItalic: require('./fonts/larsseit-italic.ttf'),
    larsseitThin: require('./fonts/larsseit-thin.ttf'),
    hindBold: require('./fonts/Hind-Bold.ttf'),
    hindRegular: require('./fonts/Hind-Regular.ttf'),
    hindLight: require('./fonts/Hind-Light.ttf'),
  });
  /* eslint-enable */
  const imageAssets = cacheImages(preloadImages);

  // promise load all
  const result = await Promise.all([...fontAssets, ...imageAssets]);
  return result;
};

export default {
  cacheImages,
  loadAssetsAsync,
};
