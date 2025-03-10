import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const SVGstarIcon = ({ color, width, height }) => (
  <Svg
    color={color}
    width={width}
    height={height}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M15.963 6.207 11.5 5.558 9.505 1.514a.565.565 0 0 0-1.009 0L6.5 5.558l-4.463.649a.562.562 0 0 0-.31.96l3.228 3.148-.763 4.446a.562.562 0 0 0 .816.592L9 13.254l3.992 2.099a.562.562 0 0 0 .816-.592l-.763-4.446 3.229-3.148a.562.562 0 0 0-.311-.96Z"
      fill={color}
    />
  </Svg>
);
