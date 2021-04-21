import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import AppPropTypes from '../../utils/AppPropTypes';
import colors from '../../constants/colors';
import gStyle from '../../constants/gStyle';
import { MINI_HIT_SLOP } from '../../constants/hitSlops';

export const getStyle = () => ({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  addUsersButton: {
    ...gStyle.grayBorder,
  },
});

export default function ModalInput(props) {
  const style = getStyle();
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        hitSlop={MINI_HIT_SLOP}
        onPress={() => {
          setIsShowModal(!isShowModal);
        }}
        style={style.itemText}
      >
        {props.InputComponent({
          value: props.value,
          onPress: setIsShowModal,
        })}
      </TouchableOpacity>
      <Modal
        backdropOpacity={0.3}
        isVisible={isShowModal}
        onBackdropPress={() => setIsShowModal(false)}
        style={style.modalContainer}
        scrollOffset={10}
      >
        <props.ModalComponent
          placeholder={props.placeholder}
          style={[style.hover, style.overlay]}
          value={props.value}
          onClose={() => setIsShowModal(false)}
          options={props.options}
          onSubmitEditing={props.onSubmitEditing}
        />
      </Modal>
    </View>
  );
}

ModalInput.propTypes = {
  InputComponent: PropTypes.func.isRequired,
  ...AppPropTypes.formInput,
};
