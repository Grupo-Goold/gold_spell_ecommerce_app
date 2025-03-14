import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const SVGmyProfile = ({ color, size, strokeColor }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    size={size}
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43C7.56 3.99 9.54 2 12 2a4.435 4.435 0 0 1 .16 8.87Zm-5 3.69c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0Z"
      stroke={strokeColor}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
