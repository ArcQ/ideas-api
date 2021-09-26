import React from 'react';
import {
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LabDetailContainer from '../../screens/LabDetailScreen/LabDetailContainer';
import {
  CREATE_LAB_ROUTE,
  EDIT_LAB_ROUTE,
  HOME_ROUTE,
  JOIN_LAB_ROUTE,
  LAB_DETAIL_ROUTE,
  PROFILE_ROUTE,
} from '../../constants/routes';
import DrawerContentContainer from './components/DrawerContentContainer';
import ProfileContainer from '../../screens/ProfileScreen/ProfileContainer';
import EditLabContainer from '../../screens/EditLabScreen/EditLabContainer';
import CreateLabContainer from '../../screens/CreateLabScreen/CreateLabContainer';
import JoinLabContainer from '../../screens/JoinLabScreen/JoinLabContainer';
import MainStackNavigator from './MainStackNavigator/MainStackNavigator';
import device from '../../constants/device';
import colors from '../../constants/colors';

const Drawer = createDrawerNavigator();

const createIdeaTransition = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
        {
          scale: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9],
              })
            : 1,
        },
      ],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  }),
};

export default function SignedInDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(_props) => <DrawerContentContainer {..._props} />}
      edgeWidth={120}
      drawerType="slide"
      drawerWidth={device.width - 32}
      initialRouteName={HOME_ROUTE}
      overlayColor={colors.black50}
      drawerStyle={{
        width: '90%',
      }}
    >
      <Drawer.Screen
        name={HOME_ROUTE}
        title="Home"
        component={MainStackNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={EDIT_LAB_ROUTE}
        title="Edit Lab"
        component={EditLabContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Drawer.Screen
        name={LAB_DETAIL_ROUTE}
        title="Lab Detail"
        component={LabDetailContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Drawer.Screen
        name={JOIN_LAB_ROUTE}
        title="Join Lab"
        component={JoinLabContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Drawer.Screen
        name={CREATE_LAB_ROUTE}
        title="Create Lab"
        component={CreateLabContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Drawer.Screen
        name={PROFILE_ROUTE}
        title="Profile"
        component={ProfileContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
    </Drawer.Navigator>
  );
}

SignedInDrawerNavigator.propTypes = {};
