import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const SVGLocationIcon = ({ color = "#FFFFFF", ...props }) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      d="M2.473 6.061a4.479 4.479 0 1 1 8.958.03v.052c-.03 1.608-.929 3.094-2.03 4.255a11.775 11.775 0 0 1-2.094 1.725.543.543 0 0 1-.71 0 11.56 11.56 0 0 1-2.948-2.76 5.732 5.732 0 0 1-1.176-3.286V6.06Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      clipRule="evenodd"
    />
    <Path
      d="M6.951 7.582a1.436 1.436 0 1 0 0-2.871 1.436 1.436 0 0 0 0 2.87Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
    />
  </Svg>
);

export default SVGLocationIcon;