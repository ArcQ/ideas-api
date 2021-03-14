import { SafeAreaView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import gStyle from '../../constants/gStyle';
import SelectList from '../../components/SelectList';

const style = {
  container: {
    padding: 15,
  },
};

export default function EditLab(props) {
  return (
    <SafeAreaView>
      <View style={style.container}>
        <Text style={[gStyle.title]} ellipsizeMode="tail">
          Edit Labs
        </Text>
        <SelectList
          placeholder="Search for Labs"
          items={props.labs}
          onChangeText={(text) => {
            console.log(text);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

EditLab.propTypes = {
  labs: PropTypes.array,
};
