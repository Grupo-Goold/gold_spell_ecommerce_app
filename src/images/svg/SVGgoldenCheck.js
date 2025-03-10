import * as React from "react";
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg";
export const SVGgoldenCheck = ({ size, props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={7.5} cy={7.5} r={7.5} fill="#CBC698" />
    <G clipPath="url(#a)">
      <Path
        d="M10.499 5.249 6.374 9.374 4.499 7.499"
        stroke="#FEFEFE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2.999 2.999h9v9h-9z" />
      </ClipPath>
    </Defs>
  </Svg>
);
