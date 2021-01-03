import React from 'react';
import PropTypes from 'prop-types';

import IdeaDetail from './IdeaDetail';

function IdeaDetailContainer(props) {
  const _props = {};

  const methods = {};

  return <IdeaDetail {...{ ..._props, ...methods }} />;
}

IdeaDetailContainer.propTypes = {
  navigation: PropTypes.object,
};

export default IdeaDetailContainer;
