import React from "react";
import {IconProps} from "../Index";

const Filter: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      style={Object.assign(
        {},
        props.style, 
        props.size ? {width: props.size, height: props.size} : {}
      )}
      xmlns="http://www.w3.org/2000/svg"
      width="17.374"
      height="16.268"
      viewBox="0 0 17.374 16.268"
    >
      <g
        id="Grupo_656"
        data-name="Grupo 656"
        transform="translate(-372.563 -133.623)"
      >
        <path
          id="Icon_feather-filter"
          data-name="Icon feather-filter"
          d="M19.374,4.5H3l6.55,8.024v5.547l3.275,1.7V12.524Z"
          transform="translate(370.063 129.623)"
          fill="none"
          stroke="#fb2346"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        />
      </g>
    </svg>
  );
};
//
export default Filter;
