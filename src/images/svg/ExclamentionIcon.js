import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const ExclamationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <G fill={props.fillColor || "#000"}>
      <Path d="M9.8.4a9.8 9.8 0 1 0 9.8 9.8A9.81 9.81 0 0 0 9.8.4Zm0 17.967a8.166 8.166 0 1 1 8.167-8.167A8.176 8.176 0 0 1 9.8 18.367Z" />
      <Path d="M9.801 4.484a.817.817 0 0 0-.817.817v6.533a.816.816 0 1 0 1.634 0V5.301a.816.816 0 0 0-.817-.817ZM10.618 15.1a.817.817 0 1 0-1.634 0 .817.817 0 0 0 1.634 0Z" />
    </G>
  </Svg>
);
export default ExclamationIcon;
