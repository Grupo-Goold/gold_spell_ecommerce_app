import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
export const SVGminusButton = (props) => (
  <Svg
    width={21}
    height={22}
    viewBox="0 0 21 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x={0.5} y={1.083} width={20} height={20} rx={10} stroke="#EAEAEA" />
    <Path
      d="M7 11h7.48"
      stroke="#263238"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
