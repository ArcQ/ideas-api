import { TouchableOpacity, View } from 'react-native';
import { ImagePicker } from 'expo';
import React from 'react';
import PropTypes from 'prop-types';

import gStyle from '../../constants/gStyle';
import { MINI_HIT_SLOP } from '../../constants/hitSlops';

const style = {
  closeButton: (topInset) => ({
    position: 'absolute',
    right: 20,
    top: 10 + topInset,
    zIndex: 100,
  }),
  addUsersButton: {
    ...gStyle.grayBorder,
  },
};

export default function ModalInput(props) {
  const activateInviteUsersModal = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        hitSlop={MINI_HIT_SLOP}
        onPress={() => {
          activateInviteUsersModal();
        }}
        style={style.itemText}
      >
        <View style={style.addUsersButton} />
      </TouchableOpacity>
    </View>
  );
}

ModalInput.propTypes = {
  formConfig: PropTypes.object,
  onSubmit: PropTypes.func,
  pickImage: PropTypes.func,
  image: PropTypes.object,
};
