import { Keyboard, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import React from 'react';

import SvgBrainstorm from '../components/icons/Svg.Brainstorm';
import gStyle from '../constants/gStyle';
import colors from '../constants/colors';
import { StylePropType } from '../utils/types';

const styles = {
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
};

export default function HomeSwipeLayout({
  ImageComponent,
  BeforeImageComponent,
  AfterImageComponent,
  AfterActionComponent,
  ...props
}) {
  const navigation = useNavigation();
  const ContainerView = props.disableScroll ? View : ScrollView;
  return (
    <ContainerView
      style={[
        styles.scrollView,
        { backgroundColor: colors.white },
        props.containerStyle,
      ]}
    >
      <SafeAreaView style={styles.contentContainer}>
        <View style={gStyle.containerNavBlocks}>
          <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            onPress={() => {
              Keyboard.dismiss();
              navigation.openDrawer();
            }}
          >
            <SvgBrainstorm />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>{props.children}</View>
      </SafeAreaView>
    </ContainerView>
  );
}

HomeSwipeLayout.propTypes = {
  onActionPress: PropTypes.func,
  disableScroll: PropTypes.bool,
  actionMsg: PropTypes.string,

  BeforeImageComponent: PropTypes.func,
  ImageComponent: PropTypes.func,
  AfterImageComponent: PropTypes.func,
  AfterActionComponent: PropTypes.func,
  containerStyle: StylePropType,
  children: PropTypes.node,
};