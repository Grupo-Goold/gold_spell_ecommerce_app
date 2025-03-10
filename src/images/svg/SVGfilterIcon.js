import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
export const SVGfilterIcon = (props) => (
  <Svg
    width={45}
    height={45}
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={45} height={45} rx={22.5} fill="#CBC698" />
    <Path
      d="M24.29 32a.8.8 0 0 1-.475-.158l-3.167-2.375a.79.79 0 0 1-.317-.634v-4.449l-5.554-6.248A3.087 3.087 0 0 1 17.086 13h11.241a3.087 3.087 0 0 1 2.306 5.136l-5.552 6.248v6.824a.79.79 0 0 1-.791.792m-2.375-3.562 1.583 1.187v-5.542c0-.193.072-.38.2-.525l5.754-6.474a1.504 1.504 0 0 0-1.125-2.5H17.086a1.505 1.505 0 0 0-1.125 2.5l5.754 6.474a.8.8 0 0 1 .2.525z"
      fill="#fff"
    />
  </Svg>
);
