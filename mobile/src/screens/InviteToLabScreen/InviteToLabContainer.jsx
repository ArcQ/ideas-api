import React from 'react';
import PropTypes from 'prop-types';

import InviteToLab from './InviteToLab';

function InviteToLabContainer(props) {
  const _props = {
  };

  const methods = {};

  return <InviteToLab {...{ ..._props, ...methods }} />;
}

InviteToLabContainer.propTypes = {
  navigation: PropTypes.object,
};

export default InviteToLabContainer;
