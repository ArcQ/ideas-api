import React, { useState } from "react";
import { View, TouchableOpacity, Animated, StyleSheet, Text, Dimensions } from "react-native";

export default function AnimatedTabNav({ state, navigation, dimensions }) {
  const { routes, index: activeRouteIndex } = state;
  const tabWidth = (Dimensions.get('window').width - 40) / routes.length;
  const [translateValue] = useState(new Animated.Value(0));

  const onTabPress = (route, routeIndex) => {
    const isFocused = state.index === routeIndex;

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onTabBarPress = (route, routeIndex) => {
    onTabPress(route);
    Animated.spring(translateValue, {
      toValue: routeIndex * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <Animated.View
          style={[
            styles.activeTab,
            {
              width: tabWidth,
              transform: [{ translateX: translateValue }],
            },
          ]}
        >
          <View style={[styles.activeTabInner, { width: tabWidth - 4 }]} />
        </Animated.View>
      </View>
      {routes.map((route, routeIndex) => (
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20 }}
          key={routeIndex}
          style={styles.tabButton}
          onPress={() => {
            onTabBarPress(route, routeIndex);
          }}
          onLongPress={() => {
            onTabLongPress(route);
          }}
        >
          <Text>
            {route.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 8.91,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabInner: {
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 6.93,
    opacity: '0.8'
  },
};
