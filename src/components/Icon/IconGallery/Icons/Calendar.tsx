import React from 'react';
import { IconProps } from '../Index';

const Calendar : React.FC<IconProps> = (props) => {

    return <svg {...props} style={Object.assign({}, props.style, props.size? {width: props.size, height: props.size} : {})} xmlns="http://www.w3.org/2000/svg" width="12.5" height="14.286" viewBox="0 0 12.5 14.286">
        <path id="Icon_awesome-calendar" data-name="Icon awesome-calendar" d="M.335,5.357h11.83a.336.336,0,0,1,.335.335v7.254a1.34,1.34,0,0,1-1.339,1.339H1.339A1.34,1.34,0,0,1,0,12.946V5.692A.336.336,0,0,1,.335,5.357ZM12.5,4.129v-1a1.34,1.34,0,0,0-1.339-1.339H9.821V.335A.336.336,0,0,0,9.487,0H8.371a.336.336,0,0,0-.335.335V1.786H4.464V.335A.336.336,0,0,0,4.129,0H3.013a.336.336,0,0,0-.335.335V1.786H1.339A1.34,1.34,0,0,0,0,3.125v1a.336.336,0,0,0,.335.335h11.83A.336.336,0,0,0,12.5,4.129Z" fill="#fb2346"/>
    </svg>;
};
//
export default Calendar;
