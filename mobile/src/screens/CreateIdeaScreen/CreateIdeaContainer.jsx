import { graphql, useMutation } from 'react-relay';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { appSelectors } from '../../store/app/ducks';
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

function CreateIdeaContainer(props) {
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

  const [createIdea, { loading }] = useMutation(createIdeaMutation);

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
            labId: props.currentLab.id,
          },
        },
        onCompleted(data) {
          props.navigation.goBack();
        },
        onError(error) {},
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
  currentLab: PropTypes.object,
};

const mapStateToProps = (state) => ({
  currentLab: appSelectors.currentLab(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateIdeaContainer);
