import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';

import envService from '../../services/env/envService';
import CustomPropTypes from '../../utils/customPropTypes';
import CreateIdeaScreen from './CreateIdeaScreen';

const initialFormState = envService.getDefaultValues('createIdea');

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
    minHeight: 50,
  },
};

export default function CreateIdeaContainer(props) {
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

  return (
    <FormProvider {...formMethods}>
      <CreateIdeaScreen
        {...methods}
        formConfig={formConfig}
        initialFormState={initialFormState}
      />
    </FormProvider>
  );
}

CreateIdeaContainer.propTypes = {
  navigation: CustomPropTypes.navigation,
  createMortgageReferral: PropTypes.func,
  isLoading: PropTypes.bool,
  requestRvpList: PropTypes.func,
  createIdea: PropTypes.func,
};
