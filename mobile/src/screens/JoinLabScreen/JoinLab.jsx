import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import SelectList from '../../components/SelectList';

export default function JoinLab(props) {
  console.log(props);
  return (
    <SafeAreaView style={{ flex: 1, padding: 15 }}>
      <SelectList
        placeholder="Search for Labs"
        items={props.labs}
        onChangeText={(text) => {
          console.log(text);
        }}
      />
    </SafeAreaView>
  );
}

JoinLab.propTypes = {
  labs: PropTypes.array,
};
