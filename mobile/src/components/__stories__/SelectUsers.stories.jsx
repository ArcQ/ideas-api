import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { MockWithPadding } from 'utils/testing/Mock';
import SelectUsers from '../SelectUsers';

export const Basic = () => (
  <MockWithPadding appearance="outline">
    <SelectUsers
      users={[
        {
          id: '1544caf8-df80-11ea-87d0-0242ac130003',
          createdAt: '2020-10-11T16:52:11+05:00',
          updatedAt: '2020-10-11T16:52:11+05:00',
          firstName: 'sarah',
          lastName: 'doe',
          authKey: '5728dfb5-d089-48f1-aa9c-f1ea436fa8b1',
          email: 'sarah.doe@gmail.com',
          username: 'sarah',
          imageUrl:
            'https://images.unsplash.com/photo-1597476934600-ef660b4ce617?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        },
        {
          id: '40e6215d-b5c6-4896-987c-f30f3678f608',
          fields: {
            firstName: 'eddie',
            createdAt: '2020-10-11T16:52:11+05:00',
            updatedAt: '2020-10-11T16:52:11+05:00',
            lastName: 'law',
            email: 'eddielaw@test.com',
            authKey: '129830df-f45a-46b3-b766-2101db28ea62',
            imageUrl:
              'https://images.unsplash.com/photo-1597476934600-ef660b4ce617?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            username: 'arcq',
          },
        },
      ]}
      onChangeText={(text) => {
        console.log(text);
      }}
    />
  </MockWithPadding>
);

storiesOf('SelectUsers', module).add('basic', Basic);
