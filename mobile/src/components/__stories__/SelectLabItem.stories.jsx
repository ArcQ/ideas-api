import { FlatList, View } from 'react-native';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { mockLab } from '../../utils/mockData';
import { MockWithPadding } from '../../utils/testing/Mock';
import SelectLabItem from '../SelectLabItem';

export const Basic = () => (
  <MockWithPadding appearance="outline">
    <View>
      <SelectLabItem item={mockLab} />
    </View>
  </MockWithPadding>
);

export const BasicList = () => (
  <MockWithPadding appearance="outline">
    <FlatList
      style={{ margin: 5 }}
      data={[
        {
          id: '6034f8e2-df82-11ea-87d0-0242ac130003',
          createdAt: '2020-10-10',
          createdByUsername: 'arcq',
          updatedAt: '2020-10-10',
          name: 'base1',
          imageUrl:
            'https://images.unsplash.com/photo-1597476934600-ef660b4ce617?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        },
      ]}
      keyExtractor={(item) => item.id}
      renderItem={SelectLabItem}
    />
  </MockWithPadding>
);

storiesOf('SelectLabItem', module)
  .add('basic', Basic)
  .add('basicList', BasicList);
