import React from 'react';
import PropTypes from 'prop-types';

import AmplifyAuth from './AmplifyAuth';

function AmplifyAuthContainer(props) {
  const _props = {
  };

  const methods = {};

  return <AmplifyAuth {...{ ..._props, ...methods }} />;
}

AmplifyAuthContainer.propTypes = {
  navigation: PropTypes.object,
};

export default AmplifyAuthContainer;
