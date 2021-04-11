import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { theme } from './components/Styled';
import { QueryContext } from './context';
import { appSelectors } from './store/app/ducks';
import AuthStack from './navigation/AuthStack';
import MainDrawerNavigator from './navigation/MainDrawerNavigator';

function LoggedIn() {
  return (
    <QueryContext.Provider value={{}}>
      <MainDrawerNavigator />
    </QueryContext.Provider>
  );
}

LoggedIn.propTypes = {};

function Main(props) {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  if (props.isLoading) {
    return null;
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          // await analytics().logScreenView({
          //   screen_name: currentRouteName,
          //   screen_class: currentRouteName,
          // });
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      {!props.signedIn ? (
        <AuthStack />
      ) : (
        <LoggedIn currentLab={props.currentLab} />
      )}
    </NavigationContainer>
  );
}

Main.propTypes = {
  signedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
  currentLab: PropTypes.object,
};

const mapStateToProps = (state) => ({
  signedIn: appSelectors.signedIn(state),
  isLoading: appSelectors.isLoading(state),
  currentLab: appSelectors.currentLab(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
