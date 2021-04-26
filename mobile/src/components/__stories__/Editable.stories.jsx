import React from 'react';

import { storiesOf } from '@storybook/react-native';
import Editable from '../Editable';
import { MockWithPadding } from 'utils/testing/Mock';

export const Basic = () => (
  <MockWithPadding appearance="outline">
    <Editable />
  </MockWithPadding>
);

storiesOf('Editable', module).add('basic', Basic);
