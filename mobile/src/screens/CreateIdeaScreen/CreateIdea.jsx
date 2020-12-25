import { SafeAreaView } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import KfForm from '../../components/Form/KfForm';
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

export default function CreateIdea(props) {
  console.log(props);
  console.log(props.formConfig);
  return (
    <ScrollableAvoidKeyboard>
      <SafeAreaView style={styles.container}>
        <KfForm formConfig={props.formConfig} submitMsg="Create Idea" />
      </SafeAreaView>
    </ScrollableAvoidKeyboard>
  );
}

CreateIdea.propTypes = {
  goToChat: PropTypes.func,
  navigation: PropTypes.object,
  initialFormState: PropTypes.object,
  formConfig: PropTypes.object,
};
