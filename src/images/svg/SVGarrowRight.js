import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const SVGarrowRight = ({ color, size, props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 7 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M1.313 1.125 5.688 5.5 1.313 9.875"
      stroke="#1D1E20"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
