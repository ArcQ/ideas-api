import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import Clipboard from 'expo-clipboard';

import LabItem from './components/LabItem';
import AppPropTypes from '../../utils/AppPropTypes';
import { MINI_HIT_SLOP } from '../../constants/hitSlops';
import colors from '../../constants/colors';
import gStyle from '../../constants/gStyle';

const getStyle = () => ({
  copiedText: {},
  code: {
    ...gStyle.thinEmphasis,
    ...gStyle.grayBorder,
    flex: 'none',
    padding: 10,
    borderRadius: 15,
  },
  codeContainer: {
    ...gStyle.flexCenter,
    flex: 'none',
    padding: 10,
  },
  codeSection: {
    marginBottom: 10,
    marginTop: 30,
  },
  desc: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 'none',
  },
  toastText: {
    color: colors.white,
    display: 'inline-block',
    padding: 10,
  },
});

export default function InviteToLab(props) {
  const style = getStyle();

  return (
    <SafeAreaView>
      <View style={gStyle.containerPadding}>
        <Text style={gStyle.title}>Invite to lab</Text>
        <LabItem item={props.lab} />
        <View style={[gStyle.flexRowCenter, style.codeSection]}>
          <View style={style.codeContainer}>
            <Text style={style.code}>{props.code}</Text>
          </View>
          <TouchableOpacity
            hitSlop={MINI_HIT_SLOP}
            onPress={props.copyToClipboard}
            style={style.copyButton}
          >
            <FontAwesome5 name="copy" size={20} color={colors.green} />
          </TouchableOpacity>
        </View>
        <Text style={style.desc}>
          Send this code to your teammates. They can use this code to find your
          lab.
        </Text>
      </View>
    </SafeAreaView>
  );
}

InviteToLab.propTypes = {
  code: PropTypes.string,
  lab: AppPropTypes.lab,
  copyToClipboard: PropTypes.func,
};
