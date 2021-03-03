import { SafeAreaView, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CreateLab from '../../screens/CreateLabScreen/CreateLab';
import ScrollableAvoidKeyboard from '../ScrollableAvoidKeyboard';
import CloseButton from '../buttons/CloseButton';
import KfForm from './KfForm';

const style = {
  closeButton: (topInset) => ({
    position: 'absolute',
    right: 20,
    top: 10 + topInset,
    zIndex: 100,
  }),
};

export default function AddUsersInput(props) {
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
          postFormInputComponent={() => <View />}
          onSubmit={props.onSubmit}
        />
      </SafeAreaView>
    </ScrollableAvoidKeyboard>
  );
}

CreateLab.propTypes = {
  formConfig: PropTypes.object,
  onSubmit: PropTypes.func,
  pickImage: PropTypes.func,
  image: PropTypes.object,
};
