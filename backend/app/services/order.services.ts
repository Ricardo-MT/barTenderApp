import Order from '../models/Order/order';
import bartenderSession from '../models/Session/session';

class OrderService {
    constructor() { }

    handleIncomingOrder(order: Order): boolean {
        return bartenderSession.handleIncomingOrder(order);
    }

    getOrders(): Array<Order> {
        return bartenderSession.report.orders;
    }
}

export default OrderService;