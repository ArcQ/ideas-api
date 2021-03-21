import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { LogBox } from 'react-native';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { RelayEnvironmentProvider } from 'relay-hooks';
import React, { Suspense, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';

import { appSelectors } from './store/app/ducks';
import AuthStack from './navigation/AuthStack';
import loadAssets from './assets/loadAssets';
import Locale from './Locale';
import AlertToast from './components/AlertToast';
import { theme } from './components/Styled';
import relay from './relay';
import ErrorBoundary from './ErrorBoundary';
import SuspenseScreen from './screens/SuspenseScreen/SuspenseScreen';
import MainDrawerNavigator from './navigation/MainDrawerNavigator';
import apiService from './services/api/apiService';
import awsService from './services/aws/awsService';
import getStore from './store/store';

LogBox.ignoreLogs(['No current user']);
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

RelayEnvironmentWrapper.propTypes = {
  children: PropTypes.node,
};

function Main(props) {
  if (props.isLoading) {
    return null;
  }
  return <>{!props.signedIn ? <AuthStack /> : <MainDrawerNavigator />}</>;
}

Main.propTypes = {
  signedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  signedIn: appSelectors.signedIn(state),
  isLoading: appSelectors.isLoading(state),
});

const mapDispatchToProps = {};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

function App() {
  const [isAssetsLoading, setAssetsLoading] = useState(true);

  if (isAssetsLoading) {
    return (
      <AppLoading
        onFinish={() => setAssetsLoading(false)}
        onError={() => console.log('TODO')}
        startAsync={loadAssets.loadAssetsAsync}
      />
    );
  }
  return (
    <RelayEnvironmentWrapper>
      <SafeAreaProvider>
        <ActionSheetProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Locale />
              <NavigationContainer theme={theme}>
                <MainContainer />
              </NavigationContainer>
              <AlertToast />
            </PersistGate>
          </Provider>
        </ActionSheetProvider>
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
