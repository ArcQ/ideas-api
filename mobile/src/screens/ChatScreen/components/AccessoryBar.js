import React from 'react';
import { View } from 'react-native';

import gStyle from '../../../constants/gStyle';
import SvgAt from '../../../components/icons/Svg.At';
import SvgPaperClip from '../../../components/icons/Svg.PaperClip';
import SvgImage from '../../../components/icons/Svg.Image';
import SendButton from '../../../components/buttons/SendButton';

export default (props) => (
  <View style={[gStyle.flexRowCenter, gStyle.pH8]}>
    <View style={[gStyle.flexRow, gStyle.flex4]}>
      <View style={gStyle.mR16}>
        <SvgAt />
      </View>
      <SvgPaperClip />
    </View>
    <View style={gStyle.flexRowCenterAlign}>
      <View style={gStyle.mR16}>
        <SvgImage />
      </View>
      <SendButton {...props} />
    </View>
  </View>
);
