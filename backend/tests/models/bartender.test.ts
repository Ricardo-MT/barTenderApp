import Bartender from '../../app/models/Bartender/bartender';
import { IDrink } from '../../app/models/Drink/drink';
import Order from '../../app/models/Order/order';

describe('Bartender Model', () => {
    it('should have name, preparationTime, properties, preparationCapacity properties defined, and currentAction undefined', () => {
        let capacity: Map<IDrink, number> = new Map();
        capacity.set('BEER', 2);
        capacity.set('DRINK', 1);

        const bartender = new Bartender({
            name: "Bartender_1",
            preparationTime: 5000,
            preparationCapacity: capacity,
        });

        expect(bartender.name).toBeDefined();
        expect(bartender.preparationTime).toBeDefined();
        expect(bartender.preparationCapacity).toBeDefined();
        expect(bartender.currentAction).toBeUndefined();
    });

    it('should have all properties as expected', () => {
        let capacity: Map<IDrink, number> = new Map();
        capacity.set('BEER', 2);
        capacity.set('DRINK', 1);

        const bartender = new Bartender({
            name: "Bartender_1",
            preparationTime: 5000,
            preparationCapacity: capacity,
        });

        expect(bartender.name).toBe('Bartender_1');
        expect(bartender.preparationTime).toBe(5000);
        expect(bartender.preparationCapacity.size).toBe(2);
        expect(bartender.preparationCapacity.get("BEER")).toBe(2);
        expect(bartender.preparationCapacity.get("DRINK")).toBe(1);
        expect(bartender.currentAction).toBeUndefined();
    });

    it('should have handleIncomingOrder function', () => {
        let capacity: Map<IDrink, number> = new Map();
        capacity.set('BEER', 2);
        capacity.set('DRINK', 1);

        const bartender = new Bartender({
            name: "Bartender_1",
            preparationTime: 5,
            preparationCapacity: capacity,
        });

        expect(bartender.handleIncomingOrder).toBeDefined();
    })

    it('should have currentAction defined after handleIncomingOrder is called', () => {
        let capacity: Map<IDrink, number> = new Map();
        capacity.set('BEER', 2);
        capacity.set('DRINK', 1);

        const bartender = new Bartender({
            name: "Bartender_1",
            preparationTime: 500,
            preparationCapacity: capacity,
        });

        let canServeOrder = bartender.handleIncomingOrder(new Order({ user: 45, drink: "BEER" }));

        expect(bartender.currentAction).toBeDefined();
        expect(canServeOrder).toBe(true);
        expect(bartender.currentAction.drink).toBe('BEER');
        expect(bartender.currentAction.count).toBe(1);
    })

    it('should add drink to currentAction after handleIncomingOrder is called with same drink type', () => {
        let capacity: Map<IDrink, number> = new Map();
        capacity.set('BEER', 2);
        capacity.set('DRINK', 1);

        const bartender = new Bartender({
            name: "Bartender_1",
            preparationTime: 5,
            preparationCapacity: capacity,
        });

        bartender.handleIncomingOrder(new Order({ user: 45, drink: "BEER" }));
        expect(bartender.currentAction.count).toBe(1);

        bartender.handleIncomingOrder(new Order({ user: 45, drink: "BEER" }));
        expect(bartender.currentAction.count).toBe(2);
    })

    it('should not add drink to currentAction after handleIncomingOrder is called with type of drink not defined in the capacity object', () => {
        let capacity: Map<IDrink, number> = new Map();
        capacity.set('DRINK', 1);

        const bartender = new Bartender({
            name: "Bartender_1",
            preparationTime: 5000,
            preparationCapacity: capacity,
        });

        let drink: IDrink = 'BEER';
        let totalDrinksToAdd: number = bartender.preparationCapacity.get(drink) | 3;
        for (let i = 0; i < totalDrinksToAdd; i++) {
            bartender.handleIncomingOrder(new Order({ user: 45, drink, }));
        }

        expect(bartender.currentAction?.count).toBeFalsy();
    })

    it('should not add drink to currentAction after handleIncomingOrder is called with same type of drink and exceeds capacity', () => {
        let capacity: Map<IDrink, number> = new Map();
        capacity.set('BEER', 2);
        capacity.set('DRINK', 1);

        const bartender = new Bartender({
            name: "Bartender_1",
            preparationTime: 5000,
            preparationCapacity: capacity,
        });

        let drink: IDrink = 'BEER';
        let totalDrinksToAdd: number = bartender.preparationCapacity.get(drink) + 1;
        let canServeLastOrder = true;
        for (let i = 0; i < totalDrinksToAdd; i++) {
            let _canServeLastOrder = bartender.handleIncomingOrder(new Order({ user: 45, drink, }));
            if (i + 1 == totalDrinksToAdd) {
                canServeLastOrder = _canServeLastOrder;
            }
        }

        expect(bartender.currentAction.count).toBe(bartender.preparationCapacity.get(drink));
        expect(canServeLastOrder).toBe(false);
    })

    it('should not add drink to currentAction after handleIncomingOrder is called with different type of drink', () => {
        let capacity: Map<IDrink, number> = new Map();
        capacity.set('BEER', 2);
        capacity.set('DRINK', 1);

        const bartender = new Bartender({
            name: "Bartender_1",
            preparationTime: 5,
            preparationCapacity: capacity,
        });

        bartender.handleIncomingOrder(new Order({ user: 45, drink: "BEER" }));
        bartender.handleIncomingOrder(new Order({ user: 5, drink: "DRINK" }));

        expect(bartender.currentAction.count).toBe(1);
    })
});