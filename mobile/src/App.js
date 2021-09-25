import { Provider } from 'react-redux';
import { RelayEnvironmentProvider } from 'react-relay';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';

import Main from './Main';
import loadAssets from './assets/loadAssets';
import Locale from './Locale';
import AlertToast from './components/AlertToast';
import relay from './relay';
import ErrorBoundary from './ErrorBoundary';
import SuspenseScreen from './screens/SuspenseScreen/SuspenseScreen';
import apiService from './services/api/apiService';
import awsService from './services/aws/awsService';
import getStore from './store/store';

awsService.init();
apiService.init();

const { store, persistor } = getStore();

function RelayEnvironmentWrapper({ children }) {
  return (
    <RelayEnvironmentProvider environment={relay.environment}>
      <ErrorBoundary fallback={<SuspenseScreen error />}>
        {children}
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}

RelayEnvironmentWrapper.propTypes = {
  children: PropTypes.node,
};

// class AssetsException {
//   constructor() {
//     this.message = 'Error loading assets';
//     this.name = 'AssetsException';
//   }
// }

function App() {
  const [isAssetsLoading, setAssetsLoading] = useState(true);

  return (
    <RelayEnvironmentWrapper>
      {isAssetsLoading ? (
        <AppLoading
          onFinish={() => setAssetsLoading(false)}
          onError={() => {
            // throw new AssetsException();
          }}
          startAsync={loadAssets.loadAssetsAsync}
        />
      ) : (
        <SafeAreaProvider>
          <ActionSheetProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Locale />
                <Main />
                <AlertToast />
              </PersistGate>
            </Provider>
          </ActionSheetProvider>
        </SafeAreaProvider>
      )}
    </RelayEnvironmentWrapper>
  );
}

export default App;
