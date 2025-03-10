import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={19}
    height={20}
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.22 8.222a8.17 8.17 0 0 1-4.783-1.538v6.987c0 3.49-2.84 6.329-6.33 6.329a6.3 6.3 0 0 1-3.626-1.147A6.33 6.33 0 0 1 .78 13.671c0-3.49 2.84-6.329 6.33-6.329.29 0 .573.024.852.062v3.51a2.9 2.9 0 0 0-.852-.134 2.894 2.894 0 0 0-2.89 2.891 2.89 2.89 0 0 0 2.89 2.89 2.89 2.89 0 0 0 2.886-2.781L9.997 0h3.439q.002.448.08.873a4.79 4.79 0 0 0 4.703 3.911z"
      fill="#000"
    />
  </Svg>
);
export default SVGComponent;
