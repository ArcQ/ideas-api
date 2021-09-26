import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

const getStyle = () => {
  const style = {
    container: { flex: 1, flexDirection: 'row' },
  };
  return style;
};

export default function SignedInWebShell(props) {
  const style = getStyle();
  return <View style={style.container}>{props.children}</View>;
}

SignedInWebShell.propTypes = {
  children: PropTypes.node,
};
