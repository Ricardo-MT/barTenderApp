import { IDrink } from "../Drink/drink";

export interface IOrder {
    user: number;
    drink: IDrink;
    timestamp: number;
};
