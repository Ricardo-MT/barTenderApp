import React, { Dispatch, FunctionComponent } from "react";
import { ValidatorsTypes, validateInput } from "../../utils/Validators";
import inputStyles from "./Input.module.css";

type Props = {
    value: any, // OK
    setValue: Dispatch<any>, // OK
    type: string, // OK
    name: string, // OK
    error?: string, // OK
    setError?: Dispatch<any>, // OK
    validators?: ValidatorsTypes[], // OK
    customValidations?: Function[], // OK
    placeHolder?: string, // OK
    disabled?: boolean, // OK
    required?: boolean, // OK
    label?: string, // OK
    onClick?: (e: React.FocusEvent<HTMLInputElement>) => void, // OK
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void, // OK
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void, // OK
    containerStyle?: React.CSSProperties, // OK
    inputStyle?: React.CSSProperties, // OK
    testId?:string // OK
}

/**
 * @author Papo
 * @param value Tipo string.
 * @param setValue Dispatch - string.
 * @param validators Array de strings. Cada elemento representa una validación genérica que se llevará a cabo con el value.
 * @param inputStyle Estilos CSS para el input tag.
 * @param containerStyle Estilos CSS para el div padre que encierra el label tag y el input tag.
 * @param customValidations Array de funciones personalizadas validadoras del input value.
 * @param label Tipo string. Si no hay label ni error, solo existirá el input dentro del div contenedor.
 * @param error Tipo string. Usar en conjunto con setError. La variable que almacena el error y su setter deben estar en el componente padre de este input.
 * @param setError Dispatch - string. Función que devuelve el error resultante de pasar el value por todos los validators y los customValidators.
 * @param type Tipo del input. Texto, numerico, date, etc.
 * @param name Tipo string. Cadena que linkea el label con su input correspondiente.
 * @param required Tipo bool.
 * @param disabled Tipo bool. 
 * @returns Un div como padre, input html tag como hijo y componente principal.
 */
const Input: FunctionComponent<Props> = ({testId, value, setValue, validators, inputStyle, containerStyle, customValidations, onClick, onBlur, onChange, label, error, setError, type, name, placeHolder, required, disabled = false }) => {
    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val)
        if ((validators || customValidations) && setError) {
            const err = validateInput(val, validators, customValidations);
            setError(err)
        }
        if (onChange) onChange(e)
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        handleChanges(e);
    };

    return (
        <div onBlur={onBlur} style={containerStyle} className={`${inputStyles.inputContainer} ${(validators || customValidations) ? inputStyles.validated : ''} ${error ? inputStyles.errorContainer : ''}`}>
            {(label || error) && ( error? <span className={`${inputStyles.error} ${required ? inputStyles.required : ''} ${inputStyles.label}`}>{error}</span> : <label className={`${inputStyles.label} ${required ? inputStyles.required : ''}`} htmlFor={name}>{label}</label>)}
            <input
                data-testid={testId}
                onBlur={handleBlur}
                disabled={disabled}
                name={name}
                onFocus={onClick}
                className={`${inputStyles.input} ${disabled ? inputStyles.inputDisabled : ''}`}
                value={value || ''}
                onChange={handleChanges}
                type={type}
                style={inputStyle}
                placeholder={placeHolder} />
        </div>
    )
}

export default Input;