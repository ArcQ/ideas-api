import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions } from 'react-native';

import { CHAT_ROUTE, HOME_BOTTOM_NAVIGATOR_ROUTE, CREATE_IDEA_ROUTE } from '../constants/routes';
import HomeBottomNavigator from './HomeBottomNavigator';
import CreateIdeaContainer from '../screens/CreateIdeaScreen/CreateIdeaContainer';
import ChatContainer from '../screens/ChatScreen/ChatContainer';
import IdeasListContainer from '../screens/IdeasListScreen/IdeasListContainer';
import colors from '../constants/colors';
import AnimatedTabNav from '../components/AnimatedTabNav';

const Tab = createBottomTabNavigator();

export default function HomeChatSwipeNavigator(props) {
  return (
    <Tab.Navigator
      initialLayout={{ width: Dimensions.get("window").width }}
      tabBarOptions={{
        showLabel: false,
        dimensions: Dimensions.get("window"),
      }}
      tabBar={(props) => <AnimatedTabNav {...props} />}
      initialRouteName={"MainIdeasListScreen"}
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
        name="MainIdeasListScreen"
        component={IdeasListContainer}
      />
      <Tab.Screen
        name={CREATE_IDEA_ROUTE}
        title="Create Idea"
        component={CreateIdeaContainer}
        options={{ headerShown: false }}
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
