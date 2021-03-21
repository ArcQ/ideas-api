import {
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  CHAT_ACTIONS_ROUTE,
  CREATE_LAB_ROUTE,
  EDIT_LAB_ROUTE,
  HOME_ROUTE,
  IDEA_DETAIL_ROUTE,
  INVITE_TO_LAB_ROUTE,
  JOIN_LAB_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROFILE_ROUTE,
} from '../constants/routes';
import ProfileContainer from '../screens/ProfileScreen/ProfileContainer';
import EditLabContainer from '../screens/EditLabScreen/EditLabContainer';
import CreateLabContainer from '../screens/CreateLabScreen/CreateLabContainer';
import InviteToLabContainer from '../screens/InviteToLabScreen/InviteToLabContainer';
import JoinLabContainer from '../screens/JoinLabScreen/JoinLabContainer';
import IdeaDetailContainer from '../screens/IdeaDetailScreen/IdeaDetailContainer';
import MainStackNavigator from './MainStackNavigator';
import ChatActions from '../screens/ChatActionsScreen/ChatActions';
import Notifications from '../screens/NotificationsScreen';

import DrawerContent from '../components/DrawerContent';
import device from '../constants/device';
import colors from '../constants/colors';

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

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
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
        name={INVITE_TO_LAB_ROUTE}
        title="Invite to Lab"
        component={InviteToLabContainer}
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
      <Drawer.Screen
        name={CHAT_ACTIONS_ROUTE}
        title="ChatActions"
        component={ChatActions}
        options={{ stackPresentation: 'modal' }}
      />
      <Drawer.Screen
        name={NOTIFICATIONS_ROUTE}
        title="Notifications"
        component={Notifications}
      />
      <Drawer.Screen
        name={IDEA_DETAIL_ROUTE}
        title="Idea Detail"
        component={IdeaDetailContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
    </Drawer.Navigator>
  );
}
