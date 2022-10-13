import React from "react";
import {IconProps} from "../Index";

const Trash: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      style={Object.assign(
        {},
        props.style,
        props.size ? {width: props.size, height: props.size} : {}
      )}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="28"
      viewBox="0 0 22 28"
    >
      <g
        id="Icon_material-delete"
        data-name="Icon material-delete"
        transform="translate(0.5 0.5)"
      >
        <path
          id="Icon_material-delete-2"
          data-name="Icon material-delete"
          d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21Z"
          transform="translate(-7.5 -4.5)"
          fill="none"
          stroke="#fb2345"
          stroke-width="1"
        />
      </g>
    </svg>
  );
};
//
export default Trash;
