import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import DrawerContentContainer from './DrawerContentContainer';
import ChatContainer from '../../../screens/ChatScreen/ChatContainer';

const style = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splitContainer: {
    flex: 1,
    flexDirection: 'row',
    // maxWidth: '120rem',
    width: '100%',
  },
  childContainer: { flexGrow: 1 },
  drawerContent: { maxWidth: '25rem' },
  rightPanel: { maxWidth: '35rem' },
};

export default function RightPanel(props) {
  return (
    <View style={style.container}>
      <View style={style.splitContainer}>
        <View style={[style.childContainer, style.drawerContent]}>
          <DrawerContentContainer />
        </View>
        <View style={style.childContainer}>{props.children}</View>
        <View style={[style.childContainer, style.rightPanel]}>
          <ChatContainer />
        </View>
      </View>
    </View>
  );
}

RightPanel.propTypes = {
  children: PropTypes.node,
};
