import { graphql, useMutation } from 'react-relay';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';

import InvitedUsersModalInput from '../../components/Form/InvitedUsersModalInput';
import { appSelectors } from '../../store/app/ducks';
import InvitedUsersDisplay from './components/InvitedUsersDisplay';
import ModalInput from '../../components/Form/ModalInput';
import ImageInput from '../../components/Form/ImageInput';
import envService from '../../services/env/envService';
import AppPropTypes from '../../utils/AppPropTypes';
import CreateLab from './CreateLab';

const initialFormState = envService.getDefaultValues('createLab');

const createLabMutation = graphql`
  mutation CreateLabContainerMutation($input: IdeaMutationInput!) {
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

function CreateLabContainer(props) {
  const [image, setImage] = useState();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const formConfig = {
    image: {
      overrideInput: ImageInput,
      validation: {
        required: true,
      },
    },
    name: {
      placeholder: 'Lemonade Stand Company',
      label: 'Name',
      validation: {
        required: true,
      },
    },
    // desc: {
    //   placeholder: 'Order a whole bunch of lemons, and make some lemonade!',
    //   label: 'Description',
    //   multiline: true,
    //   inputStyle: { minHeight: 200 },
    //   validation: {
    //     required: true,
    //   },
    // },
    users: {
      placeholder: 'Lemonade Stand Company',
      overrideInput: ModalInput,
      InputComponent: InvitedUsersDisplay,
      ModalComponent: InvitedUsersModalInput,
      label: 'Invite Users',
      validation: {
        required: false,
      },
    },
  };

  const [createLab, { loading }] = useMutation(createLabMutation, {
    onCompleted: ({ idea }) => {},
  });

  const methods = {
    exit() {
      // draft?
      props.navigation.goBack();
    },
    onSubmit: (data) => {
      createLab({
        variables: {
          input: {
            title: data.title,
            desc: data.desc,
            labId: props.currentLab.id,
          },
        },
      });
    },
  };

  return (
    <CreateLab
      {...methods}
      image={image}
      formConfig={formConfig}
      initialFormState={initialFormState}
    />
  );
}

CreateLabContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateLabContainer);
