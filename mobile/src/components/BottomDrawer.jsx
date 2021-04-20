import PropTypes from 'prop-types';
import React from 'react';

import colors from '../constants/colors';
import AppPropTypes from '../utils/AppPropTypes';
import BottomPanel from './BottomPanel';

export default function BottomDrawer({
  ref,
  snapPoints,
  children,
  isRoundBorder,
  dragEnabled,
  noHandle,
  headerStyle,
  backDropColor,
  containerStyle,
}) {
  return (
    <BottomPanel
      ref={ref}
      initialPosition={0}
      snapPoints={snapPoints}
      isBackDrop
      isBackDropDismissByPress
      backDropColor={backDropColor}
      isRoundBorder={isRoundBorder}
      containerStyle={{ backgroundColor: colors.white, ...containerStyle }}
      tipStyle={{
        width: 60,
        height: 4,
        marginTop: 10,
        backgroundColor: colors.black10,
      }}
      body={children}
      bodyStyle={{ backgroundColor: colors.white, flex: 1 }}
      dragEnabled={dragEnabled}
      noHandle={noHandle}
      headerStyle={headerStyle}
    />
  );
}

BottomDrawer.propTypes = {
  ref: PropTypes.func,
  snapPoints: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.node,
  isRoundBorder: PropTypes.bool,
  dragEnabled: PropTypes.bool,
  noHandle: PropTypes.bool,
  headerStyle: AppPropTypes.style,
  backDropColor: PropTypes.string,
  containerStyle: AppPropTypes.style,
};
