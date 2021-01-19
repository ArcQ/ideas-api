import React from 'react';

import { storiesOf } from '@storybook/react-native';
import CustomGiftedChatComposer from '../CustomGiftedChatComposer';
import { MockWithPadding } from 'utils/testing/Mock';

export const Basic = () => (
  <MockWithPadding appearance="outline">
    <CustomGiftedChatComposer />
  </MockWithPadding>
);

storiesOf('CustomGiftedChatComposer', module).add('basic', Basic);
