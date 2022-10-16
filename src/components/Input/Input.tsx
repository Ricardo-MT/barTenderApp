import React, { Dispatch, FunctionComponent } from "react";
import { ValidatorsTypes } from "../../utils/validators/Validators";
import inputStyles from "./Input.module.css";

type Props = {
    value: any, 
    setValue: Dispatch<any>, 
    type: string, 
    name: string, 
    error?: string, 
    setError?: Dispatch<any>, 
    validators?: ValidatorsTypes[], 
    customValidations?: Function[], 
    placeHolder?: string, 
    disabled?: boolean, 
    required?: boolean, 
    label?: string, 
    onClick?: (e: React.FocusEvent<HTMLInputElement>) => void, 
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void, 
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void, 
    containerStyle?: React.CSSProperties, 
    inputStyle?: React.CSSProperties, 
    testId?:string 
}

const Input: FunctionComponent<Props> = ({testId, value, setValue, validators, inputStyle, containerStyle, customValidations, onClick, onBlur, onChange, label, error, setError, type, name, placeHolder, required, disabled = false }) => {
    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val)
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