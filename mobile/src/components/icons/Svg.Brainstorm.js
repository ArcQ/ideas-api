import PropTypes from 'prop-types';
import * as React from 'react';
import Svg, { LinearGradient, Stop, Path } from 'react-native-svg';

function SvgBrainstorm(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 504.115 504.115"
      width={props.size}
      height={props.size}
      {...props}
    >
      <LinearGradient
        id="prefix__a"
        gradientUnits="userSpaceOnUse"
        x1={-46.218}
        y1={598.911}
        x2={17.781}
        y2={598.911}
        gradientTransform="matrix(7.8769 0 0 -7.8769 364.054 4969.635)"
      >
        <Stop offset={0.012} stopColor="#e0b386" />
        <Stop offset={0.519} stopColor="#da498c" />
        <Stop offset={1} stopColor="#961484" />
      </LinearGradient>
      <Path
        d="M79.376 312.182c0-116.137 94.153-210.29 210.29-210.298 112.735.008 204.737 88.726 210.007 200.145 2.875-15.21 4.443-30.885 4.443-46.954.007-139.209-112.853-252.062-252.047-252.07C112.853 3.005 0 115.866 0 255.09c0 120.383 84.433 221.003 197.293 246.02C127.48 466.893 79.368 395.166 79.376 312.182z"
        fill="url(#prefix__a)"
      />
      <LinearGradient
        id="prefix__b"
        gradientUnits="userSpaceOnUse"
        x1={-48.127}
        y1={619.168}
        x2={0.125}
        y2={606.667}
        gradientTransform="matrix(7.8769 0 0 -7.8769 364.054 4969.635)"
      >
        <Stop offset={0.012} stopColor="#e0b386" />
        <Stop offset={0.519} stopColor="#da498c" />
        <Stop offset={1} stopColor="#961484" />
      </LinearGradient>
      <Path
        d="M252.077 3.005C112.853 3.005 0 115.866 0 255.09"
        fill="url(#prefix__b)"
      />
      <LinearGradient
        id="prefix__c"
        gradientUnits="userSpaceOnUse"
        x1={-18.216}
        y1={585.828}
        x2={10.288}
        y2={585.828}
        gradientTransform="matrix(7.8769 0 0 -7.8769 364.054 4969.635)"
      >
        <Stop offset={0} stopColor="#29d3da" />
        <Stop offset={0.519} stopColor="#07f" />
        <Stop offset={0.999} stopColor="#064093" />
        <Stop offset={1} stopColor="#084698" />
      </LinearGradient>
      <Path
        d="M445.093 346.226c.008-43.819-23.324-82.093-58.171-103.377 11.209 18.377 17.794 39.889 17.794 62.992 0 66.907-54.248 121.155-121.163 121.155-23.111 0-44.599-6.593-62.984-17.802 21.291 34.848 59.565 58.179 103.369 58.187 66.907 0 121.155-54.248 121.155-121.155z"
        fill="url(#prefix__c)"
      />
    </Svg>
  );
}

SvgBrainstorm.defaultProps = {
  size: 34,
};

SvgBrainstorm.propTypes = {
  // optional
  size: PropTypes.number,
};

export default SvgBrainstorm;
