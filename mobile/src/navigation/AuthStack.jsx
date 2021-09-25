import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AmplifyAuthContainer from '../screens/AmplifyAuthScreen/AmplifyAuthContainer';
import LandingContainer from '../screens/LandingScreen/LandingContainer';
import { AMPLIFY_AUTH, LANDING } from '../constants/routes';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={LANDING}
        title="Landing"
        component={LandingContainer}
      />
      <Stack.Screen
        name={AMPLIFY_AUTH}
        title="Amplify"
        component={AmplifyAuthContainer}
      />
    </Stack.Navigator>
  );
}
