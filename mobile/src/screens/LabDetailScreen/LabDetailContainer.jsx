import React from 'react';
import PropTypes from 'prop-types';

import LabDetail from './LabDetail';

function LabDetailContainer(props) {
  const _props = {
  };

  const methods = {};

  return <LabDetail {...{ ..._props, ...methods }} />;
}

LabDetailContainer.propTypes = {
  navigation: PropTypes.object,
};

export default LabDetailContainer;
