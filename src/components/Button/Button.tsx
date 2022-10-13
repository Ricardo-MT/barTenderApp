import React, {FunctionComponent} from 'react';
import buttonStyles from './Button.module.css';
import Icon from '../Icon/Icon';
import { IconDefinition } from '../Icon/IconGallery/Index';

type Props = {
    text:string,
    action?:()=>void,
    backgroundColor?:string,
    style?:{},
    icon?:IconDefinition,
    type?:"button" | "reset" | "submit",
    color?:string
}

const Button : FunctionComponent<Props> = (props) => {

    return <button className={buttonStyles.btn}
                type={props.type ? props.type : "button"}
                   onClick={props.action ? props.action : ()=>{}}
                   style={Object.assign({},props.style,{backgroundColor:props.backgroundColor? props.backgroundColor :""})}
                   >
                       {props.icon && <Icon icon={props.icon}  />}
        {props.text}
    </button>
};

export default Button;