import { IDrink } from "../Drink/drink";
import SimpleLock from "../Lock/simpleLock";
import Order from "../Order/order";

class Bartender {
    private _name: string;
    private _preparationTime: number;
    private _preparationCapacity: Map<IDrink, number>;
    private _currentAction?: {
        drink: IDrink,
        count: number,
    };
    private modifyDrinkLockWaitingCount: number;
    private modifyDrinkCountLock: SimpleLock;
    private shouldPrepareDrinkLock: SimpleLock;

    constructor({
        name,
        preparationTime = 5,
        preparationCapacity,
    }: {
        name: string,
        preparationTime: number,
        preparationCapacity: Map<IDrink, number>,
    }) {
        this._name = name;
        this._preparationTime = preparationTime;
        this._preparationCapacity = preparationCapacity;
        this.shouldPrepareDrinkLock = new SimpleLock();
        this.modifyDrinkCountLock = new SimpleLock();
        this.modifyDrinkLockWaitingCount = 0;
    }

    get name() {
        return this._name;
    }

    get preparationTime() {
        return this._preparationTime;
    }

    set preparationTime(value: number) {
        this._preparationTime = value;
    }

    get preparationCapacity() {
        let preparationCapacityCopy = new Map();
        this._preparationCapacity.forEach((value, key) => {
            preparationCapacityCopy.set(key, value);
        })
        return preparationCapacityCopy;
    }

    get currentAction() {
        return this._currentAction ? { ...this._currentAction } : undefined;
    }

    private setCurrentAction(value?: {
        drink: IDrink,
        count: number,
    }) {
        this._currentAction = value;
    }

    handleIncomingOrder(order: Order): boolean {
        let acquired = this.shouldPrepareDrinkLock.acquire();
        if (acquired && this.shouldPrepareDrink(order)) {
            this.modifyDrinkLockWaitingCount += 1;

            if (!this.currentAction) {
                this.setCurrentAction({
                    drink: order.drink,
                    count: 0,
                });
            }
            this.shouldPrepareDrinkLock.release();
            this.prepareDrink();
            return true;
        }
        return false;
    }

    private shouldPrepareDrink(order: Order): boolean {
        if (!this.preparationCapacity.get(order.drink)) return false;
        if (!this.currentAction) return true;
        return order.drink === this.currentAction.drink && this.currentAction.count < this.preparationCapacity.get(order.drink);
    }

    private prepareDrink() {
        this.incrementDrinksCount();
        setTimeout(() => {
            this.decrementDrinksCount();
        }, this.preparationTime);
    }

    private incrementDrinksCount() {
        this.modifyDrinksCount(1);
    }

    private decrementDrinksCount() {
        this.modifyDrinksCount(-1);
    }

    private modifyDrinksCount(n: number) {
        while (!this.modifyDrinkCountLock.acquire()) {
        }
        while (!this.shouldPrepareDrinkLock.acquire()) {
        }
        if (this.modifyDrinkLockWaitingCount == 0) {
            this.setCurrentAction(undefined);
        }
        else {
            let _tempCurrentAction = this.currentAction;
            _tempCurrentAction.count += n;
            this.setCurrentAction(_tempCurrentAction);
        }
        this.modifyDrinkLockWaitingCount -= 1;
        this.shouldPrepareDrinkLock.release();
        this.modifyDrinkCountLock.release();
    }
}

export default Bartender;
