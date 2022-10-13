import React from 'react';
import { IconProps } from '../Index';

const PowerOff : React.FC<IconProps> = (props) => {

    return <svg {...props} style={Object.assign({}, props.style, props.size? {width: props.size, height: props.size} : {})} xmlns="http://www.w3.org/2000/svg" width="17.438" height="17.719" viewBox="0 0 17.438 17.719">
        <path id="Icon_awesome-power-off" data-name="Icon awesome-power-off" d="M14.344,1.9a8.718,8.718,0,1,1-10.132,0,.846.846,0,0,1,1.23.271L6,3.164a.843.843,0,0,1-.232,1.09,5.906,5.906,0,1,0,7.028,0,.839.839,0,0,1-.229-1.086l.555-.988A.843.843,0,0,1,14.344,1.9ZM10.687,9.281V.844A.842.842,0,0,0,9.844,0H8.719a.842.842,0,0,0-.844.844V9.281a.842.842,0,0,0,.844.844H9.844A.842.842,0,0,0,10.687,9.281Z" transform="translate(-0.562)" fill="#fb2346"/>
    </svg>;
};
//
export default PowerOff;
