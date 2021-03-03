import {
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import {
  CHAT_ACTIONS_ROUTE,
  CREATE_IDEA_ROUTE,
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
import CreateIdeaContainer from '../screens/CreateIdeaScreen/CreateIdeaContainer';
import HomeChatSwipeNavigator from './HomeChatSwipeNavigator';
import ChatActions from '../screens/ChatActionsScreen/ChatActions';
import { baseSelectors } from '../store/base/ducks';
import ModalRoutes from './ModalRoutes';
import Notifications from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

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

export default function MainAppStack() {
  const baseName = useSelector(baseSelectors.currentBaseName);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Home"
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      transitionConfig={ModalRoutes}
    >
      <Stack.Screen
        name={CHAT_ACTIONS_ROUTE}
        title="ChatActions"
        component={ChatActions}
        options={{ stackPresentation: 'modal' }}
      />
      <Stack.Screen
        name={NOTIFICATIONS_ROUTE}
        title="Notifications"
        component={Notifications}
      />
      <Stack.Screen
        name={HOME_ROUTE}
        title="Home"
        component={HomeChatSwipeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={CREATE_IDEA_ROUTE}
        title="Create Idea"
        component={CreateIdeaContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Stack.Screen
        name={IDEA_DETAIL_ROUTE}
        title="Idea Detail"
        component={IdeaDetailContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Stack.Screen
        name={JOIN_LAB_ROUTE}
        title="Join Lab"
        component={JoinLabContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Stack.Screen
        name={INVITE_TO_LAB_ROUTE}
        title="Invite to Lab"
        component={InviteToLabContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Stack.Screen
        name={EDIT_LAB_ROUTE}
        title="Edit Lab"
        component={EditLabContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Stack.Screen
        name={CREATE_LAB_ROUTE}
        title="Create Lab"
        component={CreateLabContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Stack.Screen
        name={PROFILE_ROUTE}
        title="Profile"
        component={ProfileContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
    </Stack.Navigator>
  );
}
