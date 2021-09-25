import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import {
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
  teamBackgroundImage: (marginLeft) => ({
    marginLeft,
    top: 40,
    position: 'absolute',
    zIndex: -1,
  }),
  signInButton: {
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: colors.black40,
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
    <>
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
    </>
  );
}

Landing.propTypes = {
  onSignInPress: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired,
  continueOnPress: PropTypes.func.isRequired,
};
