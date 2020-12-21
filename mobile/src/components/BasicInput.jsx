import { TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import colors from '../constants/colors';
import CustomPropTypes from '../utils/customPropTypes';
import BasicInputError from './BasicInputError';

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

export default function BasicInput(props) {
  const {
    CustomInput,
    errors,
    name,
    defaultValue,
    inputRef,
    value,
    watch,
    onFocus,
    onBlur,
    ...restProps
  } = props;

  const InputComponent = CustomInput || TextInput;
  const refProps = { ref: inputRef };
  const rules =
    props.validation ||
    (props.validationWithHooks && props.validationWithHooks({ watch }));
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <View
        style={[
          style.inputContainer,
          props.customInputStyle,
          isFocus && { borderBottomColor: colors.primary },
        ]}
      >
        <Controller
          as={
            <InputComponent
              autoCapitalize="none"
              placeholderTextColor={style.placeholder.color}
              style={[style.input]}
              onSubmitEditing={() => {
                if (props?.getNextRef) {
                  props.getNextRef()?.focus();
                }
              }}
              {...refProps}
              {...restProps}
            />
          }
          control={props.control}
          rules={rules}
          onChange={(args) => ({
            value: CustomInput ? args[0] : args[0]?.nativeEvent?.text,
          })}
          name={name}
          defaultValue={defaultValue}
        />
      </View>
      <BasicInputError errors={errors} name={name} />
    </>
  );
}

BasicInput.propTypes = {
  onChangeText: PropTypes.func,
  inputRef: PropTypes.func,
  getNextRef: PropTypes.func,
  name: PropTypes.string,
  customInputStyle: CustomPropTypes.style,
  CustomInput: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  control: PropTypes.object,
  validationWithHooks: PropTypes.func,
  errors: CustomPropTypes.errors,
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
