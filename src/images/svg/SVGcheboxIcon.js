import * as React from "react";
import Svg, { Rect } from "react-native-svg";

export const SVGcheboxIcon = (props) => (
  <Svg
    width={26}
    height={27}
    viewBox="0 0 26 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      x={1}
      y={1}
      width={24}
      height={25}
      rx={9}
      stroke="#CBC698"
      strokeWidth={2}
    />
  </Svg>
);
