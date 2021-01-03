import { Animated, Keyboard, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { SMALL_HIT_SLOP } from '../../constants/hitSlops';
import AnimatedHeader from './components/AnimatedHeader';
import SvgLightBulb from '../../components/icons/Svg.LightBulb';
import IdeasListComponent from './components/IdeasListComponent';
import gStyle from '../../constants/gStyle';
import HomeSwipeLayout from '../../layouts/HomeSwipeLayout';
import colors from '../../constants/colors';

const style = {
  ideaButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 10,
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
  },
};

export default function IdeasListScreen(props) {
  const offset = useRef(new Animated.Value(0)).current;
  return (
    <HomeSwipeLayout disableScroll isFullWidth>
      <AnimatedHeader animatedValue={offset} />
      {/* <TouchableOpacity */}
      {/*   style={{ padding: 20 }} */}
      {/*   onPress={() => props.goToChat()} */}
      {/* > */}
      {/*   <Text style={gStyle.listText}>Chats</Text> */}
      {/* </TouchableOpacity> */}
      <IdeasListComponent
        offset={offset}
        baseQueryProps={props.baseQueryProps}
      />
      <TouchableOpacity
        style={style.ideaButton}
        hitSlop={SMALL_HIT_SLOP}
        onPress={() => {
          props.goToCreateRoute();
          Keyboard.dismiss();
        }}
      >
        <SvgLightBulb />
      </TouchableOpacity>
    </HomeSwipeLayout>
  );
}

IdeasListScreen.propTypes = {
  goToCreateRoute: PropTypes.func,
};
