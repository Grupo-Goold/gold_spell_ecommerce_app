import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

const ToastInfo = (props) => (
    <Svg
        width={34}
        height={34}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G strokeWidth={0} />
        <G strokeLinecap="round" strokeLinejoin="round" />
        <G
            fill="none"
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        >
            <Path d="M12 8v4m0 4h0" />
            <Circle cx={12} cy={12} data-name="--Circle" r={10} />
        </G>
    </Svg>
);
export default ToastInfo;
