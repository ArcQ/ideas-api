import { Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import FormInputError from './FormInputError';
import gStyle from '../../constants/gStyle';
import colors from '../../constants/colors';
import AppPropTypes from '../../utils/AppPropTypes';

export const formStyle = {
  inputContainer: {
    marginBottom: 10,
    marginTop: 10,
    color: colors.black80,
    borderRadius: 20,
    width: '100%',
    overflow: 'visible',
  },
  focusLabel: {
    color: colors.green,
  },
  placeholder: {
    color: colors.black40,
  },
  input: {
    ...gStyle.textThin,
    paddingLeft: 20,
    overflow: 'hidden',
    color: colors.black,
    lineHeight: 25,
  },
  label: {
    ...gStyle.subTitle,
    paddingLeft: 5,
    paddingTop: 15,
  },
};

const FormInput = React.forwardRef((props, ref) => {
  const {
    overrideInput,
    inputContainerStyle,
    inputStyle,
    errors,
    name,
    defaultValue,
    watch,
    onFocus,
    onBlur,
    ...restProps
  } = props;

  const InputComponent = overrideInput || TextInput;

  const rules =
    props.validation ||
    (props.validationWithHooks && props.validationWithHooks({ watch }));
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      {props.label && (
        <Text style={[formStyle.label, isFocus && formStyle.focusLabel]}>
          {props.label}
        </Text>
      )}
      <View style={[formStyle.inputContainer, props.inputContainerStyle]}>
        <Controller
          render={({ onChange, value }) => (
            <InputComponent
              autoCapitalize="none"
              onFocus={() => {
                if (onFocus) {
                  onFocus();
                }
                setIsFocus(true);
              }}
              onBlur={() => {
                if (onBlur) {
                  onBlur();
                }
                setIsFocus(false);
              }}
              placeholderTextColor={formStyle.placeholder.color}
              style={[formStyle.input, props.inputStyle]}
              value={value}
              onChangeText={(text) => onChange(text)}
              onSubmitEditing={() => {
                if (props?.getNextRef) {
                  props.getNextRef()?.focus();
                }
              }}
              {...restProps}
            />
          )}
          control={props.control}
          rules={rules}
          name={name}
          defaultValue={defaultValue || ''}
          ref={ref}
        />
      </View>
      <FormInputError errors={errors} name={name} />
    </>
  );
});

FormInput.propTypes = {
  inputStyle: AppPropTypes.style,
  inputContainerStyle: AppPropTypes.style,
  onChangeText: PropTypes.func,
  getNextRef: PropTypes.func,
  name: PropTypes.string,
  overrideInputStyle: AppPropTypes.style,
  overrideInput: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  control: PropTypes.object,
  watch: PropTypes.func,
  validationWithHooks: PropTypes.func,
  errors: AppPropTypes.errors,
  dynamicProps: PropTypes.object,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  validation: PropTypes.shape({
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    max: PropTypes.number,
    pattern: PropTypes.instanceOf(RegExp),
  }),
};

export default FormInput;
