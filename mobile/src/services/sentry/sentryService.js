import * as Sentry from '@sentry/react-native';

import envService from '../env/envService';

const sentryKey = envService.getConfig('sentryKey');

export default function initSentry() {
  if (sentryKey) {
    Sentry.init({
      dsn: sentryKey,
    });
  }
}
