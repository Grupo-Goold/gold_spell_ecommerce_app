import * as React from "react";
import Svg, { Path, Line } from "react-native-svg";
export const SVGmenuIcon = (props) => (
  <Svg
    width={27}
    height={23}
    viewBox="0 0 27 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M1.6875 3.87874H25.3125C26.2445 3.87874 27 3.01045 27 1.93937C27 0.868293 26.2445 0 25.3125 0H1.6875C0.755525 0 0 0.868293 0 1.93937C0 3.01045 0.755525 3.87874 1.6875 3.87874Z"
      fill="#AFA763"
    />
    <Path
      d="M25.3125 8.87891H1.6875C0.755525 8.87891 0 9.7472 0 10.8183C0 11.8894 0.755525 12.7576 1.6875 12.7576H25.3125C26.2445 12.7576 27 11.8894 27 10.8183C27 9.7472 26.2445 8.87891 25.3125 8.87891Z"
      fill="#AFA763"
    />
    <Line
      x1={1.93609}
      y1={20.31}
      x2={13.0644}
      y2={20.31}
      stroke="#AFA763"
      strokeWidth={3.88}
      strokeLinecap="round"
    />
  </Svg>
);
