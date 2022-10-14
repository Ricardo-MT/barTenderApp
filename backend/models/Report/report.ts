import Logger from "../../loaders/logger";
import SimpleLock from "../Lock/simpleLock";
import Order from "../Order/order";

class Report {
    private _orders: Array<Order>;
    private addOrderLock: SimpleLock;

    constructor() {
        this._orders = [];
        this.addOrderLock = new SimpleLock();
    }

    addOrder(order: Order) {
        while (!this.addOrderLock.acquire()) {

        }
        Logger.debug(`User ${order.user} orders a ${order.drink} on ${new Date(order.timestamp).toLocaleString()}`);
        this._orders.push(order);
        this.addOrderLock.release();
    }

    get orders() {
        return this._orders.map(order => Order.getCopyOf(order));
    }
}

export default Report;
