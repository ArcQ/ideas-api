import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/buttons/Button';
import { StylePropType } from '../utils/AppPropTypes';

const style = {
  actionButton: {
    marginVertical: 17,
  },
  scrollView: {
    paddingVertical: 20,
  },
};

export default function OnboardingView({
  ImageComponent,
  BeforeImageComponent,
  AfterImageComponent,
  AfterActionComponent,
  ...props
}) {
  return (
    <SafeAreaView>
      <View style={[style.container, props.containerStyle]}>
        {BeforeImageComponent && <BeforeImageComponent />}
        {ImageComponent && <ImageComponent />}
        {AfterImageComponent && <AfterImageComponent />}
        <View style={[style.container, { paddingHorizontal: 20 }]}>
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 20,
              width: '100%',
            }}
          >
            {props.onActionPress && (
              <Button
                buttonStyle={style.actionButton}
                onPress={props.onActionPress}
              >
                {props.actionMsg}
              </Button>
            )}
            {AfterActionComponent && <AfterActionComponent />}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

OnboardingView.propTypes = {
  onActionPress: PropTypes.func,
  disableScroll: PropTypes.bool,
  actionMsg: PropTypes.string,

  BeforeImageComponent: PropTypes.func,
  ImageComponent: PropTypes.func,
  AfterImageComponent: PropTypes.func,
  AfterActionComponent: PropTypes.func,
  containerStyle: StylePropType,
};
