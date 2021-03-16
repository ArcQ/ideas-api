import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import AppPropTypes from '../../utils/AppPropTypes';
import colors from '../../constants/colors';
import gStyle from '../../constants/gStyle';
import { MINI_HIT_SLOP } from '../../constants/hitSlops';

export const style = {
  hover: {
    postion: 'absolute',
    bottom: 0,
  },
  overlay: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 0,
    backgroundColor: colors['basic-100'],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8.46,
    elevation: 9,
  },
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
        isVisible={props.isShowModal}
        onBackdropPress={props.onClose}
        style={style.modalContainer}
        scrollOffset={10}
      >
        <props.ModalComponent
          placeholder={props.placeholder}
          style={[style.hover, style.overlay]}
          value={props.value}
          onClose={props.onClose}
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
