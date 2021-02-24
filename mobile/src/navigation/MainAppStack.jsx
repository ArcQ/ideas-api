import {
  HeaderStyleInterpolators,
  TransitionSpecs,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import colors from '../constants/colors';
import IdeaDetailContainer from '../screens/IdeaDetailScreen/IdeaDetailContainer';
import {
  CHAT_ACTIONS_ROUTE,
  CREATE_IDEA_ROUTE,
  HOME_ROUTE,
  IDEA_DETAIL_ROUTE,
  NOTIFICATIONS_ROUTE,
} from '../constants/routes';
import CreateIdeaContainer from '../screens/CreateIdeaScreen/CreateIdeaContainer';
import HomeChatSwipeNavigator from './HomeChatSwipeNavigator';
import ChatActions from '../screens/ChatActionsScreen/ChatActions';
import { baseSelectors } from '../store/base/ducks';
import ModalRoutes from './ModalRoutes';
import Notifications from '../screens/NotificationsScreen';

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

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
  console.log('hi');

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
        options={{ headerShown: false, ...createIdeaTransition }}
      />
      <Stack.Screen
        name={IDEA_DETAIL_ROUTE}
        title="IdeaDetail"
        component={IdeaDetailContainer}
        options={{ headerShown: false, ...createIdeaTransition }}
      />
    </Stack.Navigator>
  );
}
