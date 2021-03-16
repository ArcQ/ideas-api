import { SafeAreaView } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard';
import CloseButton from '../../components/buttons/CloseButton';
import KfForm from '../../components/Form/KfForm';

const style = {
  closeButton: (topInset) => ({
    position: 'absolute',
    right: 20,
    top: 10 + topInset,
    zIndex: 100,
  }),
};

export default function CreateLab(props) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollableAvoidKeyboard>
      <SafeAreaView style={style.container}>
        <CloseButton
          onPress={props.exit}
          style={{
            ...style.closeButton(insets.top),
          }}
        />
        <KfForm
          title="Create a Lab"
          formConfig={props.formConfig}
          submitMsg="Create"
          onSubmit={props.onSubmit}
        />
      </SafeAreaView>
    </ScrollableAvoidKeyboard>
  );
}

CreateLab.propTypes = {
  formConfig: PropTypes.object,
  onSubmit: PropTypes.func,
  exit: PropTypes.func,
};
