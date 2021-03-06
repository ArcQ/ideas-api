import React from 'react';
import { Text, View } from 'react-native';

import gStyle from '../../constants/gStyle';
import TouchText from '../../components/TouchText';

// components
class ChatActionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchText
        onPress={() => navigation.goBack(null)}
        style={gStyle.mL16}
        text="Cancel"
      />
    ),
    headerRight: (
      <TouchText
        onPress={() => navigation.goBack(null)}
        style={gStyle.mR16}
        text="Save"
        textStyle={gStyle.textCiruBook14}
      />
    ),
    title: 'Do Not Disturb',
  });

  render() {
    return (
      <View style={[gStyle.flexCenter, gStyle.flex1]}>
        <Text style={gStyle.textLarsBold16}>ChatActionDetails</Text>
      </View>
    );
  }
}

export default ChatActionsScreen;
