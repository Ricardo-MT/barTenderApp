export type ValidatorsTypes = 'required';

export function isNumber(value: any){
   return typeof value === 'number' && isFinite(value);
}

export function tryParseString(value: any){
    try
    {
        const radix = 10;
        if (value != null){
            const a = parseInt(value, radix);
            if (!isNaN(a))   
                return true;
        }
    }
    catch (err){
        //this is not a number
    }
    return false; 
}

export const validateInput = (value: any, validators?: Array<ValidatorsTypes>, customValidations?: Function[]): string => {
    let error = '';

    if (validators)
        for (let j = 0; j < validators.length; j++) {
            const validator = validators[j];
            // error += genericValidator(value, validator);
            // error = genericValidator(value, validator);
            if (error) return error
        }
    if (customValidations)
        for (let j = 0; j < customValidations.length; j++) {
            const customValidator = customValidations[j];
            // error += customValidator(value);
            error = customValidator(value);
            if (error) return error
        }
    return error;
}

export const hasErrors = (errors: Object): boolean => {
    for (var value in Object.values(errors)) {
        if (value) {
            return true;
        }
    }
    return false;
}

const required = (value: any) => {
    return (value === undefined || value === null || value === '') ? 'Este campo es obligatorio.':'';
}
