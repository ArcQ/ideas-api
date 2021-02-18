import { Dimensions, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import gStyle from '../../constants/gStyle';
import LandingSvg from '../../assets/images/LandingSvg';
import colors from '../../constants/colors';
import Button from '../../components/buttons/Button';
import OnboardingLayout from '../../layouts/OnboardingLayout';

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
    ...gStyle.emphasis,
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

export default function Landing({ ...props }) {
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
          <Text style={style.question}>
            How are you planning to use Idea App?
          </Text>
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
            <Text style={style.answer}>Me and myself</Text>
            <Text style={style.desc}>
              Keep track of your own ideas. {'\n'} You can always sign up later.
            </Text>
          </View>
        </View>
      )}
      onActionPress={props.onSignUpPress}
      actionMsg="signUp"
      AfterActionComponent={() => (
        <>
          <Button onPress={props.onSignInPress}>Sign Up</Button>
          <Button
            buttonStyle={style.signInButton}
            onPress={props.onSignInPress}
          >
            Sign In
          </Button>
          <Button
            buttonStyle={style.loginGhost}
            buttonTextStyle={style.loginGhostText}
            type="ghost"
            onPress={props.onSignInPress}
          >
            Continue without an account
          </Button>
        </>
      )}
    />
  );
}

Landing.propTypes = {
  onSignInPress: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired,
};
