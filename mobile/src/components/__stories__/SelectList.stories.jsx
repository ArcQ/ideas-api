import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { MockWithPadding } from '../../utils/testing/Mock';
import SelectList from '../SelectList';

export const SelectLabs = () => (
  <MockWithPadding appearance="outline">
    <SelectList
      users={[
        {
          id: '6034f8e2-df82-11ea-87d0-0242ac130003',
          createdAt: '2020-10-10',
          createdByUsername: 'arcq',
          updatedAt: '2020-10-10',
          name: 'base1',
          imageUrl:
            'https://images.unsplash.com/photo-1597476934600-ef660b4ce617?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        },
        {
          id: '"a510a7cc-df82-11ea-87d0-0242ac130003',
          created_at: '2020-10-10',
          updated_at: '2020-10-10',
          name: 'base2',
          image_url:
            'https://images.unsplash.com/photo-1597476934600-ef660b4ce617?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        },
      ]}
      onChangeText={(text) => {
        console.log(text);
      }}
    />
  </MockWithPadding>
);

storiesOf('SelectList', module).add('labs', SelectLabs);
