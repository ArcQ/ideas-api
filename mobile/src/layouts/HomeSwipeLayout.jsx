import { Keyboard, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import React from 'react';

import { SMALL_HIT_SLOP } from '../constants/hitSlops';
import SvgBrainstorm from '../components/icons/Svg.Brainstorm';
import gStyle from '../constants/gStyle';
import colors from '../constants/colors';
import { StylePropType } from '../utils/types';

const style = {
  scrollView: {
    flex: 1,
  },
  contentContainer: (isFullWidth) => ({
    paddingHorizontal: isFullWidth ? 0 : 15,
    flex: 1,
  }),
  logo: {
    marginLeft: 10,
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
        style.scrollView,
        { backgroundColor: colors.white },
        props.containerStyle,
      ]}
    >
      <SafeAreaView style={style.contentContainer(props.isFullWidth)}>
        <View style={[gStyle.containerNavBlocks, style.logo]}>
          <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            hitSlop={SMALL_HIT_SLOP}
            onPress={() => {
              Keyboard.dismiss();
              navigation.openDrawer();
            }}
          >
            <SvgBrainstorm />
          </TouchableOpacity>
        </View>
        <View style={style.contentContainer}>{props.children}</View>
      </SafeAreaView>
    </ContainerView>
  );
}

HomeSwipeLayout.propTypes = {
  onActionPress: PropTypes.func,
  disableScroll: PropTypes.bool,
  actionMsg: PropTypes.string,
  isFullWidth: PropTypes.bool,

  BeforeImageComponent: PropTypes.func,
  ImageComponent: PropTypes.func,
  AfterImageComponent: PropTypes.func,
  AfterActionComponent: PropTypes.func,
  containerStyle: StylePropType,
  children: PropTypes.node,
};
