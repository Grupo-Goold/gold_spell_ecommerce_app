import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={25}
    width={21.875}
    viewBox="0 0 1120 1280"
    {...props}
  >
    <Path
      fill="#CBC698"
      d="M560 640a320 320 0 1 0 0-640 320 320 0 1 0 0 640M445.75 760C199.5 760 0 959.5 0 1205.75c0 41 33.25 74.25 74.25 74.25h971.5c41 0 74.25-33.25 74.25-74.25C1120 959.5 920.5 760 674.25 760z"
    />
  </Svg>
);
export default SVGComponent;
