import React, { Suspense, useEffect, useRef } from 'react';
import { useQueryLoader } from 'react-relay';
import { NavigationContainer } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { drawerContentContainerQuery } from './navigation/SignedInDrawerNavigator/components/DrawerContentContainer';
import linking from './linking';
import SuspenseScreen from './screens/SuspenseScreen/SuspenseScreen';
import { ideasListQuery } from './screens/IdeasListScreen/components/IdeasListComponent';
import AppPropTypes from './utils/AppPropTypes';
import { theme } from './components/Styled';
import { QueryContext } from './context';
import { appSelectors } from './store/app/ducks';
import SignedInDrawerNavigator from './navigation/SignedInDrawerNavigator/SignedInDrawerNavigator';
import AuthStack from './navigation/AuthStack';

function MainDrawerNavigatorWrapper(props) {
  return (
    <Suspense fallback={SuspenseScreen}>
      <QueryContext.Provider value={props}>
        <SignedInDrawerNavigator />
      </QueryContext.Provider>
    </Suspense>
  );
}

function LoggedIn(props) {
  const [drawerQueryRef, loadDrawerQuery] = useQueryLoader(
    drawerContentContainerQuery,
  );
  const [ideasListQueryRef, loadIdeasListQuery] =
    useQueryLoader(ideasListQuery);

  useEffect(() => {
    loadDrawerQuery({}, { fetchPolicy: 'store-and-network' });
    loadIdeasListQuery(
      { lab_Id: props.currentLab?.id },
      { fetchPolicy: 'store-and-network' },
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainDrawerNavigatorWrapper
      {...{
        drawerQueryRef,
        loadDrawerQuery,
        ideasListQueryRef,
        loadIdeasListQuery,
      }}
    />
  );
}

LoggedIn.propTypes = {
  currentLab: AppPropTypes.lab,
};

function Main(props) {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      onReady={() => {
        // routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        // const previousRouteName = routeNameRef.current;
        // const currentRouteName = navigationRef.current.getCurrentRoute().name;
        // if (previousRouteName !== currentRouteName) {
        //   // The line below uses the expo-firebase-analytics tracker
        //   // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
        //   // Change this line to use another Mobile analytics SDK
        //   // await analytics().logScreenView({
        //   //   screen_name: currentRouteName,
        //   //   screen_class: currentRouteName,
        //   // });
        // }
        // // Save the current route name for later comparison
        // routeNameRef.current = currentRouteName;
      }}
      linking={linking}
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
  currentLab: PropTypes.object,
};

const mapStateToProps = (state) => ({
  signedIn: appSelectors.signedIn(state),
  isLoading: appSelectors.isLoading(state),
  currentLab: appSelectors.currentLab(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
