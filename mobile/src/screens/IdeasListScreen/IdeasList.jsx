import { Animated, Keyboard, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SMALL_HIT_SLOP } from '../../constants/hitSlops';
import AnimatedHeader from './components/AnimatedHeader';
import SvgLightBulb from '../../components/icons/Svg.LightBulb';
import IdeasListComponent from './components/IdeasListComponent';
import HomeSwipeLayout from '../../layouts/HomeSwipeLayout';
import colors from '../../constants/colors';

const style = {
  ideaButton: (bottomInset) => ({
    width: 60,
    height: 60,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 10 + bottomInset,
    alignSelf: 'center',
    marginLeft: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }),
};

export default function IdeasList(props) {
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  return (
    <>
      <HomeSwipeLayout disableScroll isFullWidth>
        <AnimatedHeader animatedValue={offset} />
        <IdeasListComponent
          offset={offset}
          ideaItemOnPress={props.ideaItemOnPress}
          shareIdeaInChat={props.shareIdeaInChat}
        />
      </HomeSwipeLayout>

      <TouchableOpacity
        style={style.ideaButton(insets.bottom)}
        hitSlop={SMALL_HIT_SLOP}
        onPress={() => {
          props.createIdeaOnPress();
          Keyboard.dismiss();
        }}
      >
        <SvgLightBulb />
      </TouchableOpacity>
    </>
  );
}

IdeasList.propTypes = {
  ideaItemOnPress: PropTypes.func,
  shareIdeaInChat: PropTypes.func,
  createIdeaOnPress: PropTypes.func,
};
