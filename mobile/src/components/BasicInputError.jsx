import PropTypes from 'prop-types';
import { Text } from 'react-native';
import React from 'react';

import colors from 'themes/colors.json';
import intlService from 'services/intl/intlService';
import CustomPropTypes from 'utils/customPropTypes';

const trans = intlService.translate('validationErrors', true);

const getErrorMessage = (error) =>
  trans(`${error.ref.name}-${error.type}`) ||
  trans(`field-${error.type}`) ||
  `missing ${error.ref.name}-${error.type} translation`;

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
  errors: CustomPropTypes.errors,
  name: PropTypes.string,
};
