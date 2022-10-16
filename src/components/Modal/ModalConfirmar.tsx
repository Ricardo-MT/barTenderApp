import { FunctionComponent } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

type Props = {
    open: boolean,
    onClose: () => void,
    onConfirmar: () => void,
    onCancelar: () => void,
    header: string,
    message: string,
    confirmarMessage?: string,
    cancelarMessage?: string,
}
const ModalConfirmar: FunctionComponent<Props> = (props) => {
    const confirmar = () => {
        props.onClose();
        props.onConfirmar()
    }
    const cancelar = () => {
        props.onClose();
        props.onCancelar()
    }
    return <Modal
        open={props.open}
        onClose={props.onClose} >
        <p>{props.header}</p>
        <p>{props.message}</p>
        <Button action={cancelar} text={props.cancelarMessage ? props.cancelarMessage : 'Cancelar'} />
        <Button action={confirmar} text={props.confirmarMessage ? props.confirmarMessage : 'Confirmar'} />
    </Modal>
};

export default ModalConfirmar;
