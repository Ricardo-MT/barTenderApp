import React, { FunctionComponent, Dispatch } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

type Props = {
    open: boolean,
    setOpen: Dispatch<boolean>,
    onConfirmar: () => void,
    onCancelar: () => void,
    header: string,
    message: string,
    confirmarMessage?: string,
    cancelarMessage?: string,
}
const ModalConfirmar: FunctionComponent<Props> = (props) => {
    const confirmar = () => {
        props.setOpen(false);
        props.onConfirmar()
    }
    const cancelar = () => {
        props.setOpen(false);
        props.onCancelar()
    }
    return <Modal
        open={props.open}
        setOpen={props.setOpen} >
        <p>{props.header}</p>
        <p>{props.message}</p>
        <Button action={cancelar} color='red' text={props.cancelarMessage ? props.cancelarMessage : 'Cancelar'} />
        <Button action={confirmar} color='yellow' text={props.confirmarMessage ? props.confirmarMessage : 'Confirmar'} />
    </Modal>
};

export default ModalConfirmar;
