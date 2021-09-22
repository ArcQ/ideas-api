import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';

import HomeSwipeLayout from '../layouts/HomeSwipeLayout';
import { CHAT_ROUTE } from '../constants/routes';
import { SMALL_HIT_SLOP } from '../constants/hitSlops';
import SvgBrainstorm from './icons/Svg.Brainstorm';
import gStyle from '../constants/gStyle';
import colors from '../constants/colors';

const style = {
  scrollView: {
    flex: 1,
  },
  contentContainer: (isFullWidth) => ({
    paddingHorizontal: isFullWidth ? 0 : 15,
    flex: 1,
  }),
  logo: {
    marginLeft: 20,
  },
  actionButton: {
    marginRight: 15,
  },
  navContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <View style={style.navContainer}>
      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        style={[gStyle.containerNavBlocks, style.logo]}
        hitSlop={SMALL_HIT_SLOP}
        onPress={() => {
          Keyboard.dismiss();
          navigation.openDrawer();
        }}
      >
        <SvgBrainstorm />
      </TouchableOpacity>
      <>
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          hitSlop={SMALL_HIT_SLOP}
          style={[gStyle.containerNavBlocks, style.actionButton]}
          onPress={() => {
            Keyboard.dismiss();
            navigation.navigate(CHAT_ROUTE);
          }}
        >
          <MaterialCommunityIcons
            name="chat-outline"
            size={36}
            color={colors.black50}
          />
        </TouchableOpacity>
      </>
    </View>
  );
}

HomeSwipeLayout.propTypes = {
  RightComponent: PropTypes.func,
};
