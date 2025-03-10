import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
export const SVGfavoritesIcon = ({ color, size, strokeColor, props }) => (
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
      d="M20.62 28.81c-.34.12-.9.12-1.24 0-2.9-.99-9.38-5.12-9.38-12.12 0-3.09 2.49-5.59 5.56-5.59 1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24c3.07 0 5.56 2.5 5.56 5.59 0 7-6.48 11.13-9.38 12.12"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
