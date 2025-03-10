import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const SVGClock = (props) => (
  <Svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M7.5 13.125a5.625 5.625 0 1 0 0-11.25 5.625 5.625 0 0 0 0 11.25Z"
      stroke="#8F959E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 4.375V7.5l1.25 1.875"
      stroke="#8F959E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
