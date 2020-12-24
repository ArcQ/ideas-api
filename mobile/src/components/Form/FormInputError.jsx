import PropTypes from 'prop-types';
import { Text } from 'react-native';
import React from 'react';

import colors from '../constants/colors';
import AppPropTypes from '../utils/AppPropTypes';

const getErrorMessage = (error) => 'an error occured';

const style = {
  formErrorText: {
    color: colors.fail,
    margin: 3,
  },
};

export default function BasicInputError(props) {
  const error = props.errors?.[props.name];
  return (
    <>
      {error && (
        <Text style={style.formErrorText}>{getErrorMessage(error)}</Text>
      )}
    </>
  );
}

BasicInputError.propTypes = {
  errors: AppPropTypes.errors,
  name: PropTypes.string,
};
