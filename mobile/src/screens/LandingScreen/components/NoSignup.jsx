import { Dimensions, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../../components/buttons/Button';
import gStyle from '../../../constants/gStyle';
import colors from '../../../constants/colors';
import OnboardingLayout from '../../../layouts/OnboardingLayout';
import LandingSvg from '../../../assets/images/LandingSvg';

const style = {
  textContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 32,
  },
  question: {
    textAlign: 'center',
    marginVertical: 8,
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

export default function NoSignup({ ...props }) {
  const { width, height } = Dimensions.get('window');
  const multiplier = 1.5;
  const imageHeight = 662;
  const imageWidth = 676;
  return (
    <OnboardingLayout
      noContainerPadding
      containerStyle={{ paddingTop: 10 }}
      BeforeImageComponent={() => (
        <View style={style.textContainer}>
          <Text style={style.question}>How will you use IdeaApp?</Text>
        </View>
      )}
      ImageComponent={() => (
        <View
          style={{
            marginLeft: (-width * (multiplier - 1)) / 2,
            marginTop: -50,
            marginBottom: -150,
          }}
        >
          <LandingSvg
            width={width * multiplier}
            height={(width / imageWidth) * imageHeight * multiplier}
          />
        </View>
      )}
      AfterImageComponent={() => (
        <View>
          <View style={style.textContainer}>
            <Text style={style.answer}>Track my own ideas</Text>
            <Text style={style.desc}>
              Keep them close for now. {'\n'} You can always sign up later.
            </Text>
          </View>
        </View>
      )}
      onActionPress={props.onSignUpPress}
      actionMsg="signUp"
      AfterActionComponent={() => (
        <Button buttonStyle={style.signInButton} onPress={props.onSignInPress}>
          Continue without an account
        </Button>
      )}
    />
  );
}

NoSignup.propTypes = {
  onSignInPress: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired,
};
