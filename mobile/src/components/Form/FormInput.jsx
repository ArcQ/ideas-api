import { TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { forwardRef, useState } from 'react';

import colors from '../../constants/colors';
import AppPropTypes from '../../utils/AppPropTypes';

export const style = {
  inputContainer: {
    marginBottom: 10,
    marginTop: 10,
    color: colors.black80,
    backgroundColor: colors.black10,
    borderRadius: 20,
    width: '100%',
    overflow: 'hidden',
  },
  input: {
    padding: 15,
    paddingTop: 16,
    borderRadius: 10,
    overflow: 'hidden',
    color: colors.black80,
  },
  placeholder: {
    color: colors.black30,
  },
};

const FormInput = React.forwardRef((props, ref) => {
  const {
    overrideInput,
    errors,
    name,
    defaultValue,
    watch,
    onFocus,
    onBlur,
    ...restProps
  } = props;
  console.log(defaultValue);

  const InputComponent = overrideInput || TextInput;

  const rules =
    props.validation ||
    (props.validationWithHooks && props.validationWithHooks({ watch }));
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      <View
        style={[
          style.inputContainer,
          props.overrideInputStyle,
          isFocus && { borderBottomColor: colors.primary },
        ]}
      >
        <Controller
          render={({ onChange, value }) => (
            <InputComponent
              autoCapitalize="none"
              placeholderTextColor={style.placeholder.color}
              style={[style.input]}
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
      {/* <FormInputError errors={errors} name={name} /> */}
    </>
  );
});

FormInput.propTypes = {
  onChangeText: PropTypes.func,
  getNextRef: PropTypes.func,
  name: PropTypes.string,
  overrideInputStyle: AppPropTypes.style,
  overrideInput: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  control: PropTypes.object,
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
