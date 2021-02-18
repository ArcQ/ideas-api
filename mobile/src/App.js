import { NavigationContainer } from '@react-navigation/native';
import { RelayEnvironmentProvider } from 'relay-hooks';
import React, { Suspense, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';

import AuthStack from './navigation/AuthStack';
import loadAssets from './assets/loadAssets';
import Locale from './Locale';
import AlertToast from './components/AlertToast';
import { theme } from './components/Styled';
import relay from './relay';
import ErrorBoundary from './ErrorBoundary';
import SuspenseScreen from './screens/SuspenseScreen/SuspenseScreen';
import MainAppStack from './navigation/MainAppStack';
import apiService from './services/api/apiService';
import awsService from './services/aws/awsService';
import getStore from './store/store';

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
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (loading) {
    return (
      <AppLoading
        onFinish={() => setLoading(false)}
        onError={() => console.log('TODO')}
        startAsync={loadAssets.loadAssetsAsync}
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
              {!isSignedIn ? <AuthStack /> : <MainAppStack />}
            </NavigationContainer>
            <AlertToast />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </RelayEnvironmentWrapper>
  );
}

export default App;

// export default withAuthenticator(
//   App,
//   {
//     includeGreetings: false,
//     theme: { myTheme: AmplifyTheme },
//     handleAuthStateChange: (authState) => {
//       if (authStateToActionDict[authState]) {
//         store.dispatch(authStateToActionDict[authState]);
//         // store.replaceReducer();
//       }
//     },
//     signUpConfig: {
//       header: 'Sign Up',
//       signUpFields: defaultSignupFields.pop(),
//     },
//     hideDefault: true,
//   },
//   [
//     <SignIn />,
//     <ConfirmSignIn />,
//     <VerifyContact />,
//     <SignUp />,
//     <ConfirmSignUp />,
//     <ForgotPassword />,
//     <RequireNewPassword />,
//   ],
// );
