import * as React from "react";
import Svg, { Rect } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={84}
    height={4}
    viewBox="0 0 84 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={83.333} height={4} rx={2} fill={props.color || "#CBC698"} />
  </Svg>
);
export default SVGComponent;
