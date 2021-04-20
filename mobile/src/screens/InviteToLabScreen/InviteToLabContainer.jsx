import { Clipboard } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { mockLab } from '../../utils/mockData';
import InviteToLab from './InviteToLab';

//TODO this is unused
function InviteToLabContainer(props) {
  const code = 'a1597';
  const _props = {
    code,
    lab: mockLab,
  };

  const methods = {
    copyToClipboard: () => {
      Clipboard.setString(code);
    },
  };

  return <InviteToLab {...{ ..._props, ...methods }} />;
}

InviteToLabContainer.propTypes = {
  navigation: PropTypes.object,
};

export default InviteToLabContainer;
