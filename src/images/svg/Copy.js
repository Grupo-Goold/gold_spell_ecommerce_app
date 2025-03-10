import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14 5.056v-.5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h.429"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Rect
      x={10}
      y={9.556}
      width={12}
      height={14}
      rx={3}
      stroke="#000"
      strokeWidth={2}
    />
  </Svg>
);
export default SVGComponent;
