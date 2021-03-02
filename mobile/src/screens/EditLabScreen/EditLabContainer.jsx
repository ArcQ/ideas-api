import React from 'react';
import PropTypes from 'prop-types';

import EditLab from './EditLab';

function EditLabContainer(props) {
  const _props = {
  };

  const methods = {};

  return <EditLab {...{ ..._props, ...methods }} />;
}

EditLabContainer.propTypes = {
  navigation: PropTypes.object,
};

export default EditLabContainer;
