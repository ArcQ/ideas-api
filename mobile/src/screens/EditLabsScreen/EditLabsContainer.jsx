import React from 'react';
import PropTypes from 'prop-types';

import EditLabs from './EditLabs';

function EditLabsContainer(props) {
  const _props = {};

  const methods = {};

  return <EditLabs {...{ ..._props, ...methods }} />;
}

EditLabsContainer.propTypes = {
  navigation: PropTypes.object,
};

export default EditLabsContainer;
