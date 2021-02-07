import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 455.431 455.431"
      height="100"
      preserveAspectRatio="xMinYMin slice"
      width="100"
      {...props}
    >
      <Path
        d="M405.493 412.764c-69.689 56.889-287.289 56.889-355.556 0-69.689-56.889-62.578-300.089 0-364.089s292.978-64 355.556 0 69.689 307.201 0 364.089z"
        fill="#8dc640"
      />
      <Path
        d="M229.138 313.209c-62.578 49.778-132.267 75.378-197.689 76.8-48.356-82.489-38.4-283.022 18.489-341.333 51.2-52.622 211.911-62.578 304.356-29.867 22.755 93.867-24.178 213.333-125.156 294.4z"
        fill="#fff"
        opacity={0.2}
      />
    </Svg>
  );
}

export default SvgComponent;
