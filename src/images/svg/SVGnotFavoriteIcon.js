import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
export const SVGnotFavoriteIcon = (props) => (
  <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={26} height={26} rx={13} fill="#292526" />
    <Path
      d="M13.414 18.8733C13.1873 18.9533 12.814 18.9533 12.5873 18.8733C10.654 18.2133 6.33398 15.46 6.33398 10.7933C6.33398 8.73332 7.99398 7.06665 10.0407 7.06665C11.254 7.06665 12.3273 7.65332 13.0007 8.55998C13.674 7.65332 14.754 7.06665 15.9607 7.06665C18.0073 7.06665 19.6673 8.73332 19.6673 10.7933C19.6673 15.46 15.3473 18.2133 13.414 18.8733Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
