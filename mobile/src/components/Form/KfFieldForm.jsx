import { useForm, FormProvider } from 'react-hook-form';
import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import gStyle from '../../constants/gStyle';
import Button from '../buttons/Button';
import FormInput from './FormInput';
import AppPropTypes from '../../utils/AppPropTypes';
import ScrollableAvoidKeyboard from '../ScrollableAvoidKeyboard';

const style = {
  container: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingBottom: 0,
  },
  title: {
    ...gStyle.title,
    marginTop: -10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  desc: {
    marginTop: 14,
  },
  formFields: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  placeholder: {
    minHeight: 80,
  },
  submitButton: {
    minHeight: 80,
  },
};

function FormComponent(props) {
  const formMethods = useForm({
    defaultValues: props.initialFormState,
  });
  const { watch, control, errors, handleSubmit } = formMethods;

  const fieldEntries = Object.entries(props.formConfig);

  return (
    <FormProvider {...formMethods}>
      <ScrollableAvoidKeyboard>
        <SafeAreaView style={style.container}>
          {props.title && <Text style={style.title}>{props.title}</Text>}
          {props.desc && <Text style={style.desc}>{props.desc}</Text>}
          <View style={style.formFields}>
            {fieldEntries.map(([name, passThroughInputProps]) => {
              props.formRefs[name] = React.createRef();
              return (
                <FormInput
                  inputRef={props.formRefs[name]}
                  watch={watch}
                  key={name}
                  control={control}
                  name={name}
                  errors={errors}
                  {...passThroughInputProps}
                />
              );
            })}
          </View>
          {props.postFormInputComponent && props.postFormInputComponent()}
          <View style={style.placeholder} />
          <View style={{ paddingHorizontal: 20 }}>
            <Button
              style={style.submitButton}
              size="giant"
              isLoading={props.isSubmitting}
              onPress={handleSubmit(props.onSubmit)}
            >
              {props.submitMsg}
            </Button>
            {props.altActionMsg && (
              <Button
                style={style.submitButton}
                type="ghost"
                size="giant"
                onPress={props.onAltActionPress}
              >
                {props.altActionMsg}
              </Button>
            )}
          </View>
        </SafeAreaView>
      </ScrollableAvoidKeyboard>
    </FormProvider>
  );
}

FormComponent.propTypes = {
  onSubmit: PropTypes.func,
  postFormInputComponent: PropTypes.func,
  submitMsg: PropTypes.string,
  onAltActionPress: PropTypes.func,
  altActionMsg: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  isSubmitting: PropTypes.bool,
  style: AppPropTypes.style,
  preNode: PropTypes.node,
  formRefs: PropTypes.object,
  initialFormState: PropTypes.object,
  lightWeight: PropTypes.bool,
  /**
   * formConfig
   * placeholder: string
   * label: string
   * style: styleObj?
   * validation: { required: true, maxLength... }?
   * restProps: props?
   * */
  formConfig: PropTypes.object,
};

// need to use a clas here to save refs, refactor
export default class FormWrapper extends Component {
  constructor(props) {
    super(props);
    this.formRefs = {};
  }

  render() {
    return <FormComponent formRefs={this.formRefs} {...this.props} />;
  }
}
