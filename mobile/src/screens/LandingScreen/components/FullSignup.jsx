import { Dimensions, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import LandingTgtSvg from '../../../assets/images/LandingTgtSvg';
import Button from '../../../components/buttons/Button';
import gStyle from '../../../constants/gStyle';
import colors from '../../../constants/colors';
import OnboardingLayout from '../../../layouts/OnboardingLayout';

const style = {
  textContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 20,
  },
  question: {
    textAlign: 'center',
    marginTop: 30,
    ...gStyle.subTitle,
  },
  answer: {
    textAlign: 'center',
    marginVertical: 8,
    ...gStyle.title,
    color: colors.green,
  },
  desc: {
    textAlign: 'center',
    ...gStyle.text,
  },
  signInButton: {
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: colors.black40,
  },
};

export default function FullSignup({ ...props }) {
  const { width, height } = Dimensions.get('window');
  const imageHeight = 451;
  const imageWidth = 325;
  const multiplier = (height * 0.5) / imageHeight;
  return (
    <>
      <OnboardingLayout
        noContainerPadding
        containerStyle={{ paddingTop: 10 }}
        BeforeImageComponent={() => (
          <View style={style.textContainer}>
            <Text style={style.question}>How will you start?</Text>
          </View>
        )}
        ImageComponent={() => (
          <View style={style.backgroundImage(width, multiplier)}>
            <LandingTgtSvg
              width={width * multiplier}
              height={(width / imageWidth) * imageHeight * multiplier}
            />
          </View>
        )}
      />
      <View style={style.actionContainer}>
        <View style={style.textContainer}>
          <Text style={style.answer}>Brainstorm with others</Text>
          <Text style={style.desc}>
            Share your ideas, chat with the group.
            {'\n'} Find the best ideas together.
          </Text>
        </View>
        <Button onPress={props.onSignInPress}>Sign Up</Button>
        <Button buttonStyle={style.signInButton} onPress={props.onSignInPress}>
          Sign In
        </Button>
      </View>
    </>
  );
}

FullSignup.propTypes = {
  onSignInPress: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired,
};
