import { SafeAreaView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import AppPropTypes from '../../utils/AppPropTypes';
import KfForm from '../../components/Form/KfForm';
import gStyle from '../../constants/gStyle';

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
          Edit Lab
        </Text>
        <KfForm
          title="Edit Lab"
          formConfig={props.formConfig}
          submitMsg="Create"
          onSubmit={props.onSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

EditLab.propTypes = {
  labs: PropTypes.array,
  formConfig: AppPropTypes.object,
  onSubmit: PropTypes.func,
  labs: PropTypes.array,
};
