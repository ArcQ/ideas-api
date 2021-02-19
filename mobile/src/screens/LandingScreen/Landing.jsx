import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';

import gStyle from '../../constants/gStyle';
import colors from '../../constants/colors';
import FullSignup from './components/FullSignup';
import NoSignup from './components/NoSignup';

const style = {
  wrapper: {},
  button: {
    backgroundColor: colors.black20,
    marginRight: -60,
    width: 90,
    height: 90,
    borderRadius: 45,
    paddingRight: 40,
    ...gStyle.flexCenter,
  },
};

const iconSize = 30;

const pulse = {
  0: {
    opacity: 0.9,
    scale: 0.9,
  },
  0.5: {
    opacity: 1,
    scale: 1.2,
  },
  1: {
    opacity: 0.9,
    scale: 0.9,
  },
};

export default function Landing(props) {
  return (
    <Swiper
      showsButtons
      style={style.wrapper}
      loop={false}
      nextButton={
        <Animatable.View
          animation={pulse}
          iterationCount="infinite"
          style={style.button}
          duration={3000}
        >
          <MaterialIcons name="navigate-next" size={iconSize} color="white" />
        </Animatable.View>
      }
      prevButton={
        <Animatable.View
          animation={pulse}
          iterationCount="infinite"
          style={style.button}
          duration={3000}
        >
          <MaterialIcons name="navigate-before" size={iconSize} color="white" />
        </Animatable.View>
      }
    >
      <FullSignup />
      <NoSignup
        onSignInPress={props.onSignInPress}
        onSignUpPress={props.onSignUpPress}
      />
    </Swiper>
  );
}

Landing.propTypes = {
  onSignInPress: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired,
};
