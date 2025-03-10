import * as React from "react";
import Svg, { Path } from "react-native-svg";
const EditIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <Path
      fill={props.fillColor || "#000"}
      d="M11.427.575a1.813 1.813 0 0 0-2.562 0L.733 8.707A2.484 2.484 0 0 0 0 10.475V11.5a.5.5 0 0 0 .5.5h1.027a2.483 2.483 0 0 0 1.767-.732l8.133-8.133a1.813 1.813 0 0 0 0-2.561Zm-8.84 9.987c-.282.28-.663.438-1.06.439H1v-.526a1.49 1.49 0 0 1 .44-1.061L7.61 3.242l1.15 1.15-6.174 6.17Zm8.132-8.133L9.466 3.683l-1.15-1.148L9.57 1.282a.812.812 0 0 1 1.147 1.15l.002-.003Z"
    />
  </Svg>
);
export default EditIcon;
