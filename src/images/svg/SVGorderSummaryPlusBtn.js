import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
export const SVGorderSummaryPlusBtn = ({ size }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Rect width={22} height={22} rx={11} fill="#AFA763" />
    <G clipPath="url(#a)">
      <Path
        d="M16.5 10.5h-5v-5a.5.5 0 1 0-1 0v5h-5a.5.5 0 0 0 0 1h5v5a.5.5 0 1 0 1 0v-5h5a.5.5 0 1 0 0-1Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M5 5h12v12H5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
