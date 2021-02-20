import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import gStyle from '../../../constants/gStyle';
import colors from '../../../constants/colors';
import OnboardingLayout from '../../../layouts/OnboardingLayout';

const style = {
  textContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginBottom: 30,
    marginTop: 20,
  },
  question: {
    textAlign: 'center',
    ...gStyle.subTitle,
  },
  answer: {
    textAlign: 'center',
    ...gStyle.title,
    color: colors.green,
    marginBottom: 10,
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
  backgroundImage: (width, multiplier) => ({
    marginLeft: (-width * (multiplier - 1)) / 2,
    marginTop: 30,
    marginBottom: -150,
    position: 'absolute',
    zIndex: -1,
  }),
  actionContainer: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    margin: 20,
  },
};

export default function LandingOnboardingLayout(props) {
  return (
    <>
      <OnboardingLayout
        noContainerPadding
        containerStyle={{ paddingTop: 10 }}
        BeforeImageComponent={() => (
          <View style={style.textContainer}>
            <Text style={style.question}>{props.questionStr}</Text>
          </View>
        )}
        ImageComponent={() => props.image}
      />
      <View style={style.actionContainer}>
        <View style={style.actionContainer}>
          <View style={style.textContainer}>
            <Text style={style.answer}>{props.answerStr}</Text>
            {props.descStr?.split('\\n').map((text) => (
              <Text key={text} style={style.desc}>
                {text}
              </Text>
            ))}
          </View>
          {props.afterDescNode}
        </View>
      </View>
    </>
  );
}

LandingOnboardingLayout.propTypes = {
  questionStr: PropTypes.string.isRequired,
  answerStr: PropTypes.string.isRequired,
  descStr: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
  afterDescNode: PropTypes.node.isRequired,
};
