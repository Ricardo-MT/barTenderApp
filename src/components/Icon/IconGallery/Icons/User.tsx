import React from "react";
import {IconProps} from "../Index";

const User: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      style={Object.assign(
        {},
        props.style,
        props.size ? {width: props.size, height: props.size} : {}
      )}
      xmlns="http://www.w3.org/2000/svg"
      width="14.984"
      height="14.984"
      viewBox="0 0 14.984 14.984"
    >
      <path
        id="Icon_awesome-user-circle"
        data-name="Icon awesome-user-circle"
        d="M7.492.563a7.492,7.492,0,1,0,7.492,7.492A7.491,7.491,0,0,0,7.492.563Zm0,2.9A2.659,2.659,0,1,1,4.834,6.121,2.659,2.659,0,0,1,7.492,3.463Zm0,10.392a5.789,5.789,0,0,1-4.426-2.06A3.368,3.368,0,0,1,6.042,9.988a.739.739,0,0,1,.214.033,4,4,0,0,0,1.236.208,3.985,3.985,0,0,0,1.236-.208.739.739,0,0,1,.214-.033,3.368,3.368,0,0,1,2.976,1.807A5.789,5.789,0,0,1,7.492,13.855Z"
        transform="translate(0 -0.563)"
        fill="#fb2346"
      />
    </svg>
  );
};
//
export default User;
