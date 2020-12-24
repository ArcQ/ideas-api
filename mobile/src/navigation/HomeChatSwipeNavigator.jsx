import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import HomeBottomNavigator from './HomeBottomNavigator';
import Chat from '../screens/ChatScreen/Chat';
import colors from '../constants/colors';

const Tab = createMaterialTopTabNavigator();

export default function HomeChatSwipeNavigator() {
  return (
    <Tab.Navigator
      tabBar={() => <></>}
      initialRouteName="Base"
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
      tabBarOptions={{
        tabStyle: {
          paddingTop: 10,
        },
        style: {
          backgroundColor: colors.black85,
          borderTopWidth: 1,
          borderTopColor: colors.black20,
        },
        activeTintColor: colors.white,
      }}
    >
      <Tab.Screen name="Base" component={HomeBottomNavigator} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}
