import React, {FunctionComponent} from 'react';
import styles from './Button.module.css'

type Props = {
    text:string,
    action?:()=>void,
    style?:{},
    type?:"button" | "reset" | "submit",
}

const Button : FunctionComponent<Props> = (props) => {

    return <button className={styles.btn}
                type={props.type ? props.type : "button"}
                   onClick={props.action}
                   style={props.style}
                   >
        {props.text}
    </button>
};

export default Button;