import Bartender from "../Bartender/bartender";
import { IDrink } from "../Drink/drink";
import Order from "../Order/order";
import Report from "../Report/report";

class BartenderSession {
    bartender: Bartender;
    report: Report;

    constructor() {
        let capacity: Map<IDrink, number> = new Map();
        capacity.set('BEER', 2);
        capacity.set('DRINK', 1);

        this.bartender = new Bartender({
            name: 'CoolBartender',
            preparationTime: 5000,
            preparationCapacity: capacity,
        });
        this.report = new Report();
    }

    handleOrder(order: Order): boolean {
        let canServeOrder = this.bartender.handleIncomingOrder(order);
        if (canServeOrder) {
            this.report.addOrder(order);
        }
        return canServeOrder;
    }
}

export default new BartenderSession();