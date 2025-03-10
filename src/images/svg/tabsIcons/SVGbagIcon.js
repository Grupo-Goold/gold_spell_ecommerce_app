import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
export const SVGbagIcon = ({ color, size, strokeColor, props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={40} height={40} rx={15} fill={strokeColor} />
    <Path
      d="M16.4 14.5h7.2c3.4 0 3.74 1.59 3.97 3.53l.9 7.5C28.76 27.99 28 30 24.5 30h-8.99c-3.51 0-4.27-2.01-3.97-4.47l.9-7.5c.22-1.94.56-3.53 3.96-3.53"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 16v-3.5c0-1.5 1-2.5 2.5-2.5h3c1.5 0 2.5 1 2.5 2.5V16m4.41 9.03H16"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
