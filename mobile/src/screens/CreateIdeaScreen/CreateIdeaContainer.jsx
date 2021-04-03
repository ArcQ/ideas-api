import { useMutation } from 'relay-hooks';
import React from 'react';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

import envService from '../../services/env/envService';
import AppPropTypes from '../../utils/AppPropTypes';
import CreateIdea from './CreateIdea';

const initialFormState = envService.getDefaultValues('createIdea');

const createIdeaMutation = graphql`
  mutation CreateIdeaContainerMutation($input: IdeaMutationInput!) {
    idea(input: $input) {
      title
      desc
      notes
      lab {
        name
      }
      createdBy {
        username
      }
      errors {
        messages
        field
      }
    }
  }
`;

export default function CreateIdeaContainer(props) {
  const formConfig = {
    title: {
      placeholder: 'Lemonade Stand',
      label: 'Name',
      validation: {
        required: true,
      },
    },
    desc: {
      placeholder: 'Order a whole bunch of lemons, and make some lemonade!',
      label: 'Description',
      multiline: true,
      inputStyle: { minHeight: 200 },
      validation: {
        required: true,
      },
    },
  };

  const [createIdea, { loading }] = useMutation(createIdeaMutation, {
    onCompleted: ({ idea }) => {},
  });

  const methods = {
    exit() {
      // draft?
      props.navigation.goBack();
    },
    onSubmit: (data) => {
      createIdea({
        variables: {
          input: {
            title: data.title,
            desc: data.desc,
            labId: 'e27c629f-c1d1-49f1-b3eb-b67e6b7c1c2a',
            createdById: '40e6215d-b5c6-4896-987c-f30f3678f608',
          },
        },
      });
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
};
