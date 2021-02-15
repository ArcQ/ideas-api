import { SafeAreaView } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import gStyle from '../../constants/gStyle';
import CloseButton from '../../components/buttons/CloseButton';
import KfForm from '../../components/Form/KfForm';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard';
import colors from '../../constants/colors';

const style = {
  container: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
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
    right: 20,
    top: 20,
  },
  header: {
    ...gStyle.title,
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
};

export default function CreateIdea(props) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollableAvoidKeyboard>
      <SafeAreaView style={style.container}>
        <CloseButton
          onPress={props.exit}
          style={{
            ...style.closeButton,
            top: style.closeButton.top + insets.top,
          }}
        />
        <KfForm
          title="Create An Idea"
          formConfig={props.formConfig}
          submitMsg="Create"
          onSubmit={props.onSubmit}
        />
      </SafeAreaView>
    </ScrollableAvoidKeyboard>
  );
}

CreateIdea.propTypes = {
  exit: PropTypes.func,
  onSubmit: PropTypes.func,
  formConfig: PropTypes.object,
};
