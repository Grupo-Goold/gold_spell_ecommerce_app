import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PlusIcon = (props) => (
  <Svg
    role="img"
    aria-label="\xEDcone de adi\xE7\xE3o"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 34 34"
    {...props}
  >
    <Path
      stroke="#fff"
      d="M8.5 17h17M17 25.5v-17"
      strokeWidth={2}
    />
  </Svg>
);
export default PlusIcon;