import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const ToastError = (props) => (
    <Svg
        width={34}
        height={34}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G strokeWidth={0} />
        <G strokeLinecap="round" strokeLinejoin="round" />
        <Path
            d="M256 42.667C138.18 42.667 42.667 138.18 42.667 256S138.18 469.334 256 469.334 469.334 373.821 469.334 256c0-117.82-95.513-213.333-213.334-213.333Zm0 384c-94.105 0-170.666-76.561-170.666-170.667 0-94.105 76.56-170.666 170.666-170.666S426.667 161.894 426.667 256 350.106 426.667 256 426.667Zm80.336-246.886 30.167 30.167-131.836 132.389-79.083-79.083 30.166-30.167 48.917 48.916 101.67-102.222Z"
            fill={props.color}
            fillRule="evenodd"
        />
    </Svg>
);
export default ToastError;