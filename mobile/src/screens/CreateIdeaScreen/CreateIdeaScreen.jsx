import { SafeAreaView, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import React from 'react';
import PropTypes from 'prop-types';

import FormLayout from '../../layouts/FormLayout';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard';
import gStyle from '../../constants/gStyle';
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
  },
  text: {
    ...gStyle.textBold20,
    color: colors.white,
    alignSelf: 'center',
  },
};

export default function CreateIdeaScreen(props) {
  return (
    <ScrollableAvoidKeyboard>
      <SafeAreaView style={styles.container}>
        <Text>Create</Text>
        <FormLayout formConfig={props.formConfig} />
      </SafeAreaView>
    </ScrollableAvoidKeyboard>
  );
}

CreateIdeaScreen.propTypes = {
  goToChat: PropTypes.func,
  navigation: PropTypes.object,
  initialFormState: PropTypes.object,
};
