import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
export const SVGmagnifyingGlassFavorites = ({ width, height, strokeColor }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Circle
      cx={9.805}
      cy={10.305}
      r={7.49}
      stroke={strokeColor || "black"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m15.015 15.904 2.937 2.93"
      stroke={strokeColor || "black"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
