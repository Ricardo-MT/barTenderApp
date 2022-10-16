export type ValidatorsTypes = 'required';

export function isNumber(value: any) {
    return typeof value === 'number' && isFinite(value);
}
