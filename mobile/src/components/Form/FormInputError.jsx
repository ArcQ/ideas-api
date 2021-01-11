import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { titleCasing } from '../../utils/stringCasing';
import errorMapper from './errorMapper';
import colors from '../../constants/colors';
import AppPropTypes from '../../utils/AppPropTypes';

const getErrorMessage = (name, error) =>
  (errorMapper[error.type] && errorMapper[error.type](name, error)) ||
  'This field is invalid';

const style = {
  formErrorText: {
    color: colors.error,
    marginTop: 1,
    marginHorizontal: 3,
  },
  formErrorContainer: {
    padding: 5,
    paddingBottom: 20,
    flexDirection: 'row',
  },
};

export default function FormInputError(props) {
  const error = props.errors?.[props.name];
  return (
    <>
      {error && (
        <View style={style.formErrorContainer}>
          <MaterialIcons name="error-outline" size={20} color={colors.error} />
          <Text style={style.formErrorText}>
            {getErrorMessage(
              props.fieldDisplayName || titleCasing(props.name),
              error,
            )}
          </Text>
        </View>
      )}
    </>
  );
}

FormInputError.propTypes = {
  errors: AppPropTypes.errors,
  name: PropTypes.string,
  fieldDisplayName: PropTypes.string,
};
