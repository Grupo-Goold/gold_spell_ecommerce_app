import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={45}
    height={45}
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={45} height={45} rx={22.5} fill="#CBC698" />
    <Path
      d="M21.539 13a8.54 8.54 0 0 1 8.538 8.539 8.54 8.54 0 0 1-8.539 8.538A8.54 8.54 0 0 1 13 21.538 8.54 8.54 0 0 1 21.539 13m0 15.18a6.64 6.64 0 0 0 6.64-6.642 6.64 6.64 0 0 0-6.64-6.64 6.64 6.64 0 0 0-6.642 6.64 6.64 6.64 0 0 0 6.641 6.642m8.05.067 2.683 2.683-1.342 1.342-2.683-2.684z"
      fill="#fff"
    />
  </Svg>
);
export default SVGComponent;
