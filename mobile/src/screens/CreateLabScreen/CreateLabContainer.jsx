import React from 'react';
import PropTypes from 'prop-types';

import CreateLab from './CreateLab';

function CreateLabContainer(props) {
  const _props = {
  };

  const methods = {};

  return <CreateLab {...{ ..._props, ...methods }} />;
}

CreateLabContainer.propTypes = {
  navigation: PropTypes.object,
};

export default CreateLabContainer;
