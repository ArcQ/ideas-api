import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { MockWithPadding } from 'utils/testing/Mock';
import Avatar from '../Avatar';

export const Basic = () => (
  <MockWithPadding appearance="outline">
    <Avatar
      source={{
        uri:
          'https://images.unsplash.com/photo-1597476934600-ef660b4ce617?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      }}
    />
  </MockWithPadding>
);

storiesOf('Avatar', module).add('basic', Basic);
