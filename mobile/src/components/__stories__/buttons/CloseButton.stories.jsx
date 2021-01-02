import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { MockWithPadding } from '../../../utils/testing/Mock';
import CloseButton from '../../buttons/CloseButton';

export const Basic = () => (
  <MockWithPadding appearance="outline">
    <CloseButton />
  </MockWithPadding>
);

storiesOf('CloseButton', module).add('basic', Basic);
