import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import useKeyboard from '@rnhooks/keyboard';

import Button from '../components/Button';
import CustomPropTypes from '../utils/customPropTypes';
import ScrollableAvoidKeyboard from '../components/ScrollableAvoidKeyboard';
import BasicInput from '../components/BasicInput';

const style = {
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  title: {
    marginTop: 12,
  },
  desc: {
    marginTop: 14,
  },
  formFields: {
    flex: 1,
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    minHeight: 80,
  },
};

function FormsLayout(props) {
  const { watch, control, errors, handleSubmit } = useForm({
    defaultValues: props.initialFormState,
  });
  const [visible, dismiss] = useKeyboard();
  const fieldEntries = Object.entries(props.formConfig);
  const { CustomComponent } = props;

  return (
    <ScrollableAvoidKeyboard>
      <SafeAreaView style={[{ flex: 1, width: '100%' }]}>
        <View style={style.container}>
          {props.titleMsg && <Text style={style.title}>{props.titleMsg}</Text>}
          {props.descMsg && <Text style={style.desc}>{props.descMsg}</Text>}
          <View style={style.formFields}>
            {fieldEntries.map(([name, inputProps], i) => (
              <BasicInput
                inputRef={(ref) => {
                  props.formRefs[name] = ref;
                }}
                // getNextRef={() => props.formRefs[fieldEntries[i + 1]?.[0]]}
                watch={watch}
                key={name}
                control={control}
                name={name}
                errors={errors}
                {...inputProps}
              />
            ))}
            {CustomComponent ? <CustomComponent /> : null}
          </View>
          <View style={style.placeholder} />
        </View>
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
  );
}

FormsLayout.propTypes = {
  onSubmit: PropTypes.func,
  submitMsg: PropTypes.string,
  onAltActionPress: PropTypes.func,
  altActionMsg: PropTypes.string,
  titleMsg: PropTypes.string,
  descMsg: PropTypes.string,
  isSubmitting: PropTypes.bool,
  style: CustomPropTypes.style,
  preNode: PropTypes.node,
  formRefs: PropTypes.object,
  initialFormState: CustomPropTypes.initialFormState,
  /**
   * formConfig
   * placeholder: string
   * label: string
   * style: styleObj?
   * validation: { required: true, maxLength... }?
   * restProps: props?
   * */
  formConfig: CustomPropTypes.formConfig,
};

// need to use a clas here to save refs
export default class FormsLayoutWrapper extends Component {
  constructor(props) {
    super(props);
    this.formRefs = {};
  }

  render() {
    return <FormsLayout formRefs={this.formRefs} {...this.props} />;
  }
}
