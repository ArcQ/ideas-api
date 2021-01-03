import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import { CHAT_ROUTE, HOME_BOTTOM_NAVIGATOR_ROUTE } from '../constants/routes';
import HomeBottomNavigator from './HomeBottomNavigator';
import ChatContainer from '../screens/ChatScreen/ChatContainer';
import colors from '../constants/colors';

const Tab = createMaterialTopTabNavigator();

export default function HomeChatSwipeNavigator() {
  return (
    <Tab.Navigator
      tabBar={() => <></>}
      initialRouteName={HomeBottomNavigator}
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
      <Tab.Screen
        name={HOME_BOTTOM_NAVIGATOR_ROUTE}
        component={HomeBottomNavigator}
      />
      <Tab.Screen
        name={CHAT_ROUTE}
        component={ChatContainer}
        sceneContainerStyle={{
          backgroundColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
}
