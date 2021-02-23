import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';

import LandingSvg, {
  landingSvgHeight,
  landingSvgWidth,
} from '../../assets/images/LandingSvg';
import Button from '../../components/buttons/Button';
import LandingTgtSvg, {
  landingTgtSvgHeight,
  landingTgtSvgWidth,
} from '../../assets/images/LandingTgtSvg';
import gStyle from '../../constants/gStyle';
import colors from '../../constants/colors';
import LandingOnboardingLayout from './components/LandingOnboardingLayout';

const style = {
  button: {
    backgroundColor: colors.black20,
    width: 90,
    height: 90,
    borderRadius: 45,
    ...gStyle.flexCenter,
  },
  nextButton: {
    paddingRight: 40,
    marginRight: -60,
  },
  prevButton: {
    paddingLeft: 40,
    marginLeft: -60,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    margin: 20,
    marginBottom: 40,
  },
  teamBackgroundImage: (marginLeft) => ({
    marginLeft,
    top: 40,
    position: 'absolute',
    zIndex: -1,
  }),
  singleBackgroundImage: (marginLeft, height) => ({
    marginLeft,
    top: -100,
    position: 'absolute',
    zIndex: -1,
  }),
  signInButton: {
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: colors.black40,
  },
  continueButton: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: colors.black40,
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
  const { width, height } = Dimensions.get('window');
  const teamImageHeight = height * 0.6;
  const teamImageWidth =
    (teamImageHeight / landingTgtSvgHeight) * landingTgtSvgWidth;

  const singleImageWidth = 1.5 * width;
  const singleImageHeight =
    (singleImageWidth / landingSvgWidth) * landingSvgHeight;

  return (
    <Swiper
      showsButtons
      style={style.wrapper}
      loop={false}
      nextButton={
        <Animatable.View
          animation={pulse}
          iterationCount="infinite"
          style={[style.button, style.nextButton]}
          duration={3000}
        >
          <MaterialIcons name="navigate-next" size={iconSize} color="white" />
        </Animatable.View>
      }
      prevButton={
        <Animatable.View
          animation={pulse}
          iterationCount="infinite"
          style={[style.button, style.prevButton]}
          duration={3000}
        >
          <MaterialIcons name="navigate-before" size={iconSize} color="white" />
        </Animatable.View>
      }
    >
      <LandingOnboardingLayout
        questionStr="How will you start?"
        answerStr="Brainstorm with others"
        descStr="Share your ideas, chat with the group.\nFind the best ideas together."
        image={
          <View style={style.teamBackgroundImage((width - teamImageWidth) / 2)}>
            <LandingTgtSvg width={teamImageWidth} height={teamImageHeight} />
          </View>
        }
        afterDescNode={
          <>
            <Button onPress={props.onSignUpPress}>Sign Up</Button>
            <Button
              buttonStyle={style.signInButton}
              onPress={props.onSignInPress}
            >
              Sign In
            </Button>
          </>
        }
      />
      <LandingOnboardingLayout
        questionStr="How will you start?"
        answerStr="Track My Own Ideas"
        descStr="Keep them close for now.\nYou can always sign up later."
        image={
          <View
            style={{ width, height: singleImageHeight, overflow: 'hidden' }}
          >
            <View
              style={style.singleBackgroundImage(
                (width - singleImageWidth) / 2,
              )}
            >
              <LandingSvg width={singleImageWidth} height={singleImageHeight} />
            </View>
          </View>
        }
        afterDescNode={
          <>
            <Button
              buttonStyle={style.continueButton}
              onPress={props.continueOnPress}
            >
              Continue without Signing up
            </Button>
          </>
        }
      />
    </Swiper>
  );
}

Landing.propTypes = {
  onSignInPress: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired,
  continueOnPress: PropTypes.func.isRequired,
};
