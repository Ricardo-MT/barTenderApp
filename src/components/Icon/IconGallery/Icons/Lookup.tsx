import React from 'react';
import { IconProps } from '../Index';

const Lookup : React.FC<IconProps> = (props) => {

    return <svg {...props} style={Object.assign({}, props.style, props.size? {width: props.size, height: props.size} : {})} xmlns="http://www.w3.org/2000/svg" width="16.04" height="14.998" viewBox="0 0 16.04 14.998">
         <g id="Grupo_13" data-name="Grupo 13" transform="translate(-70.878 -131.421)">
            <circle id="Oval" cx="6.194" cy="6.194" r="6.194" transform="translate(71.528 132.071)" fill="none" stroke="#fb2346" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.3"/>
            <path id="Path" d="M0,0,3.324,3.082" transform="translate(82.676 142.418)" fill="none" stroke="#fb2346" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.3"/>
        </g>
    </svg>;
};
//
export default Lookup;

