import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import React from 'react';

import { CHAT_ROUTE, CREATE_IDEA_ROUTE, MAIN_IDEAS_LIST_ROUTE } from '../constants/routes';
import CreateIdeaContainer from '../screens/CreateIdeaScreen/CreateIdeaContainer';
import ChatContainer from '../screens/ChatScreen/ChatContainer';
import IdeasListContainer from '../screens/IdeasListScreen/IdeasListContainer';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={MAIN_IDEAS_LIST_ROUTE}
      screenContainerStyle={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      }}
    >
      <Stack.Screen
        name={MAIN_IDEAS_LIST_ROUTE}
        component={IdeasListContainer}
        options={{ 
          headerShown: false
        }}
      />
      <Stack.Screen
        name={CREATE_IDEA_ROUTE}
        title="Create Idea"
        component={CreateIdeaContainer}
        options={{ 
          headerShown: false,
          stackPresentation: 'modal'
        }}
      />
      <Stack.Screen
        name={CHAT_ROUTE}
        component={ChatContainer}
        sceneContainerStyle={{
          backgroundColor: '#fff',
        }}
        options={{ 
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}