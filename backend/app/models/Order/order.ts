import { IDrink } from "../Drink/drink";

class Order {
    timestamp: number;
    user: number;
    drink: IDrink;
    constructor({ user, drink }: { user: number, drink: IDrink }) {
        this.user = user;
        this.drink = drink;
        this.timestamp = new Date().valueOf();
    }

    // Gets a copy of order to avoid reference conflicts.
    static getCopyOf(order: Order): Order {
        let newOrder = new Order({ user: order.user, drink: order.drink, });
        newOrder.timestamp = order.timestamp;
        return newOrder;
    }
}

export default Order;