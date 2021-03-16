import { View } from 'react-native';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import ImageInput from '../Form/ImageInput';
import ModalInput from '../Form/ModalInput';
import KfForm from '../Form/KfForm';
import { MockWithPadding } from '../../utils/testing/Mock';

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
    label: 'Invite Users',
    validation: {
      required: false,
    },
  },
};

const basicProps = {
  formConfig,
  onSubmit: () => {},
};

export const Basic = () => (
  <MockWithPadding appearance="outline">
    <KfForm
      title="Create a Lab"
      formConfig={basicProps.formConfig}
      submitMsg="Create"
      postFormInputComponent={() => <View />}
      onSubmit={basicProps.onSubmit}
    />
  </MockWithPadding>
);

storiesOf('KfForm', module).add('basic', Basic);
