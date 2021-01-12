import { NavigationContainer } from '@react-navigation/native';
import { RelayEnvironmentProvider } from 'relay-hooks';
import React, { Suspense, useState } from 'react';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withAuthenticator } from 'aws-amplify-react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';

import Locale from './Locale';
import AlertToast from './components/AlertToast';
import { theme } from './components/Styled';
import relay from './relay';
import ErrorBoundary from './ErrorBoundary';
import SuspenseScreen from './screens/SuspenseScreen/SuspenseScreen';
import MainAppStack from './navigation/MainAppStack';
import func from './constants/func';
import { authStateToActionDict } from './store/app/ducks';
import apiService from './services/api/apiService';
import awsService from './services/aws/awsService';
import getStore from './store/store';
import AmplifyTheme from './constants/AmplifyTheme';

enableScreens();

awsService.init();
apiService.init();

const { store, persistor } = getStore();

function RelayEnvironmentWrapper({ children }) {
  return (
    <RelayEnvironmentProvider environment={relay.environment}>
      <ErrorBoundary fallback={<SuspenseScreen error />}>
        <Suspense fallback={<SuspenseScreen />}>{children}</Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}

function App() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <AppLoading
        onFinish={() => setLoading(true)}
        startAsync={func.loadAssetsAsync}
      />
    );
  }
  return (
    <RelayEnvironmentWrapper>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Locale />
            <NavigationContainer theme={theme}>
              <MainAppStack />
            </NavigationContainer>
            <AlertToast />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </RelayEnvironmentWrapper>
  );
}

export default withAuthenticator(App, {
  includeGreetings: false,
  theme: { myTheme: AmplifyTheme },
  handleAuthStateChange: (authState) => {
    if (authStateToActionDict[authState]) {
      store.dispatch(authStateToActionDict[authState]);
      // store.replaceReducer();
    }
  },
});
