import { Image } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const getStyle = (size) => ({
  img: { borderRadius: 30, margin: 10 },
  defaultSize: {
    height: size || 30,
    width: size || 30,
  },
});

export default function Avatar(props) {
  const style = getStyle(props.size);
  return <Image source={props.source} style={[style.img, style.defaultSize]} />;
}

Avatar.propTypes = {
  ...Image.propTypes,
  size: PropTypes.number,
};
