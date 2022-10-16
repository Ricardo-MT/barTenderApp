import {FunctionComponent} from 'react';
import styles from './Button.module.css'

type Props = {
    text:string,
    action?:()=>void,
    style?:{},
    disabled?: boolean, 
    type?:"button" | "reset" | "submit",
}

const Button : FunctionComponent<Props> = ({text, action, style, disabled=false, type='button'}) => {

    return <button disabled={disabled} className={styles.btn}
                type={type}
                   onClick={action}
                   style={style}
                   >
        {text}
    </button>
};

export default Button;