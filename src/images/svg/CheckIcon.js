import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CheckIcon = (props) => (
  <Svg
    role="img"
    aria-label="\xCDcone de checado"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 17"
    {...props}
  >
    <Path
      fill="#fff"
      d="M6.995 11.803a.908.908 0 0 1-.644-.267L4.407 9.592a.536.536 0 0 1 .758-.758l1.83 1.83 4.84-4.84a.536.536 0 0 1 .758.757l-4.955 4.955a.908.908 0 0 1-.643.267Z"
    />
  </Svg>
);
export default CheckIcon;
