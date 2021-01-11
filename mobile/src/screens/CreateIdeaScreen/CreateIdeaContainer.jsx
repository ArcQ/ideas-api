import React from 'react';
import PropTypes from 'prop-types';

import envService from '../../services/env/envService';
import AppPropTypes from '../../utils/AppPropTypes';
import CreateIdea from './CreateIdea';

const initialFormState = envService.getDefaultValues('createIdea');

export default function CreateIdeaContainer(props) {
  const formConfig = {
    name: {
      placeholder: 'Lemonade Stand',
      label: 'Name',
      validation: {
        required: true,
      },
    },
    description: {
      placeholder: 'Order a whole bunch of lemons, and make some lemonade!',
      label: 'Description',
      multiline: true,
      inputStyle: { minHeight: 200 },
      validation: {
        required: true,
      },
    },
  };

  const methods = {
    exit() {
      // draft?
      props.navigation.goBack();
    },
    onSubmit: () => {
      props.createIdea({});
    },
  };

  return (
    <CreateIdea
      {...methods}
      formConfig={formConfig}
      initialFormState={initialFormState}
    />
  );
}

CreateIdeaContainer.propTypes = {
  navigation: AppPropTypes.navigation,
  createMortgageReferral: PropTypes.func,
  isLoading: PropTypes.bool,
  requestRvpList: PropTypes.func,
  createIdea: PropTypes.func,
};
