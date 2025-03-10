import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={36}
    height={35}
    viewBox="0 0 36 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.97 3.216c-7.872 0-14.286 6.415-14.286 14.286s6.414 14.286 14.285 14.286 14.286-6.415 14.286-14.286S25.841 3.216 17.969 3.216m6.828 11-8.1 8.1a1.07 1.07 0 0 1-1.514 0l-4.043-4.043a1.08 1.08 0 0 1 0-1.514 1.08 1.08 0 0 1 1.514 0l3.286 3.286 7.343-7.343a1.08 1.08 0 0 1 1.514 0 1.08 1.08 0 0 1 0 1.514"
      fill="#CBC698"
    />
  </Svg>
);
export default SVGComponent;
