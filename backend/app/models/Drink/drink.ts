export const drinks = ['BEER', 'DRINK'] as const;
export type IDrink = typeof drinks[number];
