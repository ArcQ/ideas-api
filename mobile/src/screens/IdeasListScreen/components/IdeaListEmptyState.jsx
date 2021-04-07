import { Text, View } from 'react-native';
import React from 'react';

import gStyle from '../../../constants/gStyle';
import EmptyIdeasSvg from '../../../assets/images/EmptyIdeasSvg';

export default function IdeaListEmptyState() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ paddingTop: 40, paddingBottom: 20 }}>
        <EmptyIdeasSvg />
      </View>
      <Text style={{ ...gStyle.textThin }}>
        Let&apos;s create your first idea!
      </Text>
    </View>
  );
}

IdeaListEmptyState.propTypes = {};
