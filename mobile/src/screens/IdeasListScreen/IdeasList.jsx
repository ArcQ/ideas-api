import { Animated, Keyboard, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { CREATE_IDEA_ROUTE } from '../../constants/routes';
import AnimatedHeader from './components/AnimatedHeader';
import { hitSlop } from '../../constants/hitslop';
import SvgLightBulb from '../../components/icons/Svg.LightBulb';
import IdeasList from './components/IdeasList';
import gStyle from '../../constants/gStyle';
import HomeSwipeLayout from '../../layouts/HomeSwipeLayout';
import colors from '../../constants/colors';

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
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
  text: {
    ...gStyle.textBold20,
    color: colors.white,
    alignSelf: 'center',
  },
};

export default function IdeasListScreen(props) {
  const offset = useRef(new Animated.Value(0)).current;
  return (
    <HomeSwipeLayout disableScroll>
      <AnimatedHeader animatedValue={offset} />
      {/* <TouchableOpacity */}
      {/*   style={{ padding: 20 }} */}
      {/*   onPress={() => props.goToChat()} */}
      {/* > */}
      {/*   <Text style={gStyle.listText}>Chats</Text> */}
      {/* </TouchableOpacity> */}
      <IdeasList offset={offset} baseQueryProps={props.baseQueryProps} />
      <TouchableOpacity
        style={styles.ideaButton}
        hitSlop={hitSlop}
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