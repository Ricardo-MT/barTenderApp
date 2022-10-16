import React,{ FunctionComponent } from 'react';
import modalStyles from './Modal.module.css';
import ReactDOM from "react-dom";

type Props = {
    open:boolean,
    onClose:()=>void,
    children: React.ReactNode,
}
const Modal : FunctionComponent<Props> = (props) => {
    if(!document.getElementById('modal-container')){
        let element = document.createElement('div');
        element.id = 'modal-container';
        if(document.querySelector('#root')){
            document.querySelector('#root')?.appendChild(element);
        }
    }
    const ModalContent = () => {
        return (
            props.open && <div className={modalStyles.modalContainer}>
                { <React.Fragment>
                    <div className={modalStyles.backgroundModal} onClick={props.onClose}></div>
                    <div className={modalStyles.modalBody}>
                        {props.children}
                    </div>
                </React.Fragment>}
            </div>
        )
    }

    return ReactDOM.createPortal(ModalContent(),document.getElementById('modal-container') as Element);
} ;

export default Modal;