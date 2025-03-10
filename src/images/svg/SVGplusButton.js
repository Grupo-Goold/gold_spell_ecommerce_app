import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
export const SVGplusButton = (props) => (
  <Svg
    width={21}
    height={21}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x={0.5} y={0.5} width={20} height={20} rx={10} fill="#fff" />
    <Rect x={0.5} y={0.5} width={20} height={20} rx={10} stroke="#D7D7D7" />
    <Path
      d="M10.74 14.48V7M7 10.74h7.48"
      stroke="#263238"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
