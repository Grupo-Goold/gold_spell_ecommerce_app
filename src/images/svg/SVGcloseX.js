import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";
export const SVGcloseX = ({ color, backgroundColor, ...props }) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={14} height={14} fill={backgroundColor || "none"} />
    <Path
      d="m8.073 6.869 5.396-5.402A.86.86 0 0 0 12.256.252L6.86 5.655 1.465.252a.857.857 0 0 0-1.213 0 .86.86 0 0 0 0 1.215l5.396 5.402L.252 12.27a.86.86 0 0 0 1.213 1.214l5.395-5.4 5.396 5.402a.86.86 0 0 0 1.213-1.214L8.073 6.869Z"
      fill={color || "#000"}
    />
  </Svg>
);
