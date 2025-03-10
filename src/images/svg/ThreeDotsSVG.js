import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const ThreeDotsSVG = (props) => (
  <Svg
    width={4}
    height={17}
    viewBox="0 0 4 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={1.938} cy={1.938} fill="#000" r={1.938} />
    <Circle cx={1.942} cy={7.751} fill="#000" r={1.938} />
    <Circle cx={1.942} cy={14.532} fill="#000" r={1.938} />
  </Svg>
);
export default ThreeDotsSVG;
