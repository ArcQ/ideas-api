import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import gStyle from '../../constants/gStyle';
import { SMALL_HIT_SLOP } from '../../constants/hitSlops';
import colors from '../../constants/colors';
import { StylePropType } from '../../utils/AppPropTypes';

const basicButtonStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 17,
  borderRadius: 20,
  zIndex: 10,
};

export const buttonStyle = {
  outline: {
    ...basicButtonStyle,
    ...gStyle.grayBorder,
    borderWidth: 1,
  },
  filled: {
    ...basicButtonStyle,
    backgroundColor: colors.primary,
  },
  secondaryFilled: {
    ...basicButtonStyle,
    backgroundColor: colors.secondary,
  },
  ghost: {
    ...basicButtonStyle,
    flexDirection: 'row',
  },
};

export const buttonTextStyle = {
  outline: {
    color: colors.primary,
  },
  filled: {
    fontSize: 16,
    color: colors.white,
  },
  secondaryFilled: {
    color: colors.white,
  },
  ghost: {
    color: colors.primary,
    paddingLeft: 6,
  },
};

const iconStyle = {
  ghost: {
    tintColor: colors.primary,
    width: 28,
    height: 28,
  },
};

export default function Button(props) {
  const { Icon } = props;
  return (
    <TouchableOpacity
      hitSlop={SMALL_HIT_SLOP}
      style={
        props.isCustomStyleOnly
          ? props.style
          : [buttonStyle[props.type], props.style]
      }
      onPress={props.onPress}
      activeOpacity={props.type === 'ghost' ? 0.3 : 0.7}
    >
      {!props.isLoading ? (
        <>
          {Icon && <Icon {...iconStyle[props.type]} />}
          <Text
            style={
              props.customTextStyleOnly
                ? props.textStyle
                : [buttonTextStyle[props.type], props.textStyle]
            }
          >
            {props.children}
          </Text>
        </>
      ) : (
        <ActivityIndicator size="small" colors={colors['basic-100']} />
      )}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  isNavigate: PropTypes.bool,
  isCustomStyleOnly: PropTypes.bool,
  customTextStyleOnly: PropTypes.bool,
  children: PropTypes.node,
  style: StylePropType,
  textStyle: StylePropType,
  text: StylePropType,
  Icon: PropTypes.func,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  type: 'filled',
  isNavigate: false,
};
