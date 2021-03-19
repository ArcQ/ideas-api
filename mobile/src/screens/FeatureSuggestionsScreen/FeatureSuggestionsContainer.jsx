import React from 'react';
import PropTypes from 'prop-types';

import FeatureSuggestions from './FeatureSuggestions';

function FeatureSuggestionsContainer(props) {
  const _props = {};

  const methods = {};

  return <FeatureSuggestions {...{ ..._props, ...methods }} />;
}

FeatureSuggestionsContainer.propTypes = {
  navigation: PropTypes.object,
};

export default FeatureSuggestionsContainer;
