import { Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from 'relay-hooks';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

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

export default function CreateLabContainer(props) {
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
            labId: 'e27c629f-c1d1-49f1-b3eb-b67e6b7c1c2a',
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
};
