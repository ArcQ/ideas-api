import { SafeAreaView } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CloseButton from '../../components/CloseButton';
import KfForm from '../../components/Form/KfForm';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard';
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
  closeButton: {
    alignSelf: 'end',
    position: 'absolute',
    zIndex: 100,
    right: 30,
    top: 30,
  },
};

export default function CreateIdea(props) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollableAvoidKeyboard>
      <SafeAreaView style={styles.container}>
        <CloseButton
          onPress={props.exit}
          style={{ ...styles.closeButton, top: 30 + insets.top }}
        />
        <KfForm formConfig={props.formConfig} submitMsg="Create Idea" />
      </SafeAreaView>
    </ScrollableAvoidKeyboard>
  );
}

CreateIdea.propTypes = {
  exit: PropTypes.func,
  formConfig: PropTypes.object,
};
