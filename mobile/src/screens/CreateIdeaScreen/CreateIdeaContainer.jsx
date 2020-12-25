import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';

import envService from '../../services/env/envService';
import AppPropTypes from '../../utils/AppPropTypes';
import CreateIdea from './CreateIdea';

const initialFormState = envService.getDefaultValues('createIdea');

export default function CreateIdeaContainer(props) {
  const formConfig = {
    name: {
      placeholder: 'Name',
      validation: {
        required: true,
      },
    },
    description: {
      placeholder: 'Description',
      multiline: true,
    },
  };

  const [formValues, setFormValues] = useState({});

  const formMethods = useForm({});

  const methods = {
    exit() {
      // save a draft maybe?
      props.navigation.popToTop();
    },
    updateFormValues(newFormValue) {
      setFormValues({ ...formValues, ...newFormValue });
    },
    onSubmitPress: formMethods.handleSubmit(() => {
      props.createIdea({
        clientPlans: props.navigation.getParam('clientPlans'),
      });
    }),
  };

  console.log(formConfig);

  return (
    <FormProvider {...formMethods}>
      <CreateIdea
        {...methods}
        formConfig={formConfig}
        initialFormState={initialFormState}
      />
    </FormProvider>
  );
}

CreateIdeaContainer.propTypes = {
  navigation: AppPropTypes.navigation,
  createMortgageReferral: PropTypes.func,
  isLoading: PropTypes.bool,
  requestRvpList: PropTypes.func,
  createIdea: PropTypes.func,
};
