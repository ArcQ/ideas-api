import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import CreateIdeaContainer from '../screens/CreateIdeaScreen/CreateIdeaContainer';
import HomeChatSwipeNavigator from './HomeChatSwipeNavigator';
import {
  CHAT_ACTIONS_ROUTE,
  CREATE_IDEA_ROUTE,
  HOME_ROUTE,
  NOTIFICATIONS_ROUTE,
} from '../constants/routes';
import ChatActions from '../screens/ChatActionsScreen/ChatActions';
import { baseSelectors } from '../store/base/ducks';
import ModalRoutes from './ModalRoutes';
import Notifications from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

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
        title="Create"
        component={CreateIdeaContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
