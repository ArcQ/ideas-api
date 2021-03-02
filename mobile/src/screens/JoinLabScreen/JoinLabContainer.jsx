import React from 'react';
import PropTypes from 'prop-types';

import JoinLab from './JoinLab';

function JoinLabContainer(props) {
  const _props = {
  };

  const methods = {};

  return <JoinLab {...{ ..._props, ...methods }} />;
}

JoinLabContainer.propTypes = {
  navigation: PropTypes.object,
};

export default JoinLabContainer;
