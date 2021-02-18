import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AmplifyAuth from '../screens/AmplifyAuthScreen/AmplifyAuth';
import { AMPLIFY_AUTH, LANDING } from '../constants/routes';
import Landing from '../screens/LandingScreen/Landing';
import ModalRoutes from './ModalRoutes';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Landing"
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      transitionConfig={ModalRoutes}
    >
      <Stack.Screen name={LANDING} title="Landing" component={Landing} />
      <Stack.Screen
        name={AMPLIFY_AUTH}
        title="Amplify"
        component={AmplifyAuth}
      />
    </Stack.Navigator>
  );
}
