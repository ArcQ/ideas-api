import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import SelectList from '../../components/SelectList';

export default function JoinLab(props) {
  return (
    <SafeAreaView style={{ flex: 1, padding: 15, paddingTop: 25 }}>
      <SelectList
        placeholder="Find a lab to join..."
        items={props.labs}
        onChangeText={props.onChangeText}
        onItemPress={props.onLabPress}
      />
    </SafeAreaView>
  );
}

JoinLab.propTypes = {
  labs: PropTypes.array,
  onChangeText: PropTypes.func,
  onLabPress: PropTypes.func,
};
