import { Text, Animated, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../constants/colors';

const style = {
  deleteAction: {
    flex: 1,
    backgroundColor: colors.fail,
    justifyContent: 'flex-start',
  },
  deleteIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 80,
  },
  actionText: { color: 'white' },
};

function RightDeleteAction(props) {
  const trans = props.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [450, 0],
  });
  return (
    <View style={style.deleteAction}>
      <Animated.View
        style={{
          ...style.deleteIcon,
          transform: [
            {
              translateX: trans,
            },
          ],
        }}
      >
        {/* <DeleteIcon width={20} height={20} color="#fff" padding={3} /> */}
        <Text style={style.actionText}>Delete</Text>
      </Animated.View>
    </View>
  );
}

RightDeleteAction.propTypes = {
  progress: PropTypes.object, //eslint-disable-line
};

export default function SwipeableRow(props) {
  return (
    <Swipeable
      renderLeftActions={props.renderLeftActions}
      renderRightActions={props.renderRightActions}
      onSwipeableRightOpen={props.onSwipeableRightOpen}
      friction={2}
      rightThreshold={30}
    >
      {props.children}
    </Swipeable>
  );
}

SwipeableRow.propTypes = {
  renderLeftActions: PropTypes.func,
  renderRightActions: PropTypes.func,
  onSwipeableRightOpen: PropTypes.func,
  children: PropTypes.node,
};

SwipeableRow.defaultProps = {
  renderRightActions: (progress, dragX) => (
    <RightDeleteAction progress={progress} dragX={dragX} />
  ),
};
