import React from 'react';
import { IconProps } from '../Index';

const ArrowDropdown : React.FC<IconProps> = (props) => {

    return <svg {...props} style={Object.assign({}, props.style, props.size? {width: props.size, height: props.size} : {})} xmlns="http://www.w3.org/2000/svg"  width="12" height="11" viewBox="0 0 12 11">
         <g id="Polígono_1" data-name="Polígono 1" transform="translate(12 11) rotate(180)" fill="#fff">
    <path d="M 11.15772438049316 10.5 L 0.8422754406929016 10.5 L 6 1.044171690940857 L 11.15772438049316 10.5 Z" stroke="none"/>
    <path d="M 6 2.088333129882812 L 1.684545516967773 10 L 10.31545448303223 10 L 6 2.088333129882812 M 6 0 L 12 11 L 0 11 L 6 0 Z" stroke="none" fill="#888b8d"/>
  </g>
    </svg>;
};
//
export default ArrowDropdown;
