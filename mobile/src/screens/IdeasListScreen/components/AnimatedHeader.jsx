import { Animated, Text } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FilterBar from './FilterBar';
import colors from '../../../constants/colors';
import gStyle from '../../../constants/gStyle';

const HEADER_HEIGHT = 200;

const getStyle = () => ({
  animatedContainer: (headerHeight) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    margin: 20,
    height: headerHeight,
    background: 'blue',
  }),
  welcomeText: {
    ...gStyle.subTitle,
    marginTop: 10,
    color: colors.black30,
  },
  header: {
    ...gStyle.header,
    marginTop: 20,
  },
});

export default function AnimatedHeader({ animatedValue }) {
  const insets = useSafeAreaInsets();
  const style = getStyle();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, 40],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={getStyle().animatedContainer(headerHeight)}>
      <Text style={style.welcomeText}>Welcome back, Victor!</Text>
      <Text style={style.header}>
        Got some bright
        {'\n'}
        ideas today?
      </Text>
      <FilterBar />
    </Animated.View>
  );
}
