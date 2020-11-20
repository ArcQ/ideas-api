import { Keyboard, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { hitSlop } from '../../constants/hitslop';
import SvgLightBulb from '../../components/icons/Svg.LightBulb';
import IdeasList from './components/IdeasList';
import gStyle from '../../constants/gStyle';
import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import colors from '../../constants/colors';

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  ideaButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  text: {
    ...gStyle.textBold20,
    color: colors.white,
    alignSelf: 'center',
  },
};

export default function BaseScreen(props) {
  return (
    <BaseBottomTabNavigatorLayout disableScroll>
      <Text style={[styles.text]}>Base1's Ideas</Text>
      {/* <TouchableOpacity */}
      {/*   style={{ padding: 20 }} */}
      {/*   onPress={() => props.goToChat()} */}
      {/* > */}
      {/*   <Text style={gStyle.listText}>Chats</Text> */}
      {/* </TouchableOpacity> */}
      <IdeasList baseQueryProps={props.baseQueryProps} />
      <TouchableOpacity
        style={styles.ideaButton}
        hitSlop={hitSlop}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SvgLightBulb />
      </TouchableOpacity>
    </BaseBottomTabNavigatorLayout>
  );
}

BaseScreen.propTypes = {
  goToChat: PropTypes.func,
  navigation: PropTypes.object,
};
