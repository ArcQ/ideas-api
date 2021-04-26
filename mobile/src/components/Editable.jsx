import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import KfForm from './Form/KfForm';

const getStyle = () => ({
  container: { flex: 1 },
});

export default function Editable(props) {
  const style = getStyle();
  const isEdit = useState(false);
  const Display = props.displayComponent;
  return (
    <View>
      {isEdit ? (
        <Display />
      ) : (
        <KfForm
          formConfig={props.formConfig}
          submitMsg="Create"
          onSubmit={props.onSubmit}
        />
      )}
    </View>
  );
}

Editable.propTypes = {
  displayComponent: PropTypes.component,
  editable: PropTypes.bool,
  formConfig: PropTypes.bool,
  onSave: PropTypes.func,
};
