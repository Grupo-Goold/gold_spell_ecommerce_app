import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
export const SVGorderSummaryMinusBtn = ({ size }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Rect width={22} height={22} rx={11} fill="#AFA763" />
    <Path d="M5 11h12" stroke="#fff" strokeLinecap="round" />
  </Svg>
);
