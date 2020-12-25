import React from 'react';
import PropTypes from 'prop-types';

import FeatureSuggestionsScreen from './FeatureSuggestionsScreen';

function FeatureSuggestionsScreenContainer(props) {
  const _props = {
  };

  const methods = {};

  return <FeatureSuggestionsScreen {...{ ..._props, ...methods }} />;
}

FeatureSuggestionsScreenContainer.propTypes = {
  navigation: PropTypes.object,
};

export default FeatureSuggestionsScreenContainer;
