import { IDrink } from "../Drink/drink";
import SimpleLock from "../Lock/simpleLock";
import Order from "../Order/order";
/**
 * module description
 * @module MyClass
 */

class Bartender {
    private _name: string;
    // How much time it takes the bartender to prepare a drink, in milliseconds
    private _preparationTime: number;
    // Collection of type of drinks and their maximum preparation
    // capacity at the same time
    private _preparationCapacity: Map<IDrink, number>;
    // The current drink bartender being handled, and how many
    // of them is preparing
    private _currentAction?: {
        drink: IDrink,
        count: number,
    };
    // Refers to the total orders that have been approved for
    // preparation and are waiting to be prepared.
    private modifyDrinkLockWaitingCount: number;
    // This lock ensures that at any given moment during execution,
    // only one scope is modifying the amount of drinks being prepared
    private modifyDrinkCountLock: SimpleLock;
    // This lock ensures that at any given moment during execution,
    // only one order request is being checked whether or not can be
    // prepared
    private shouldPrepareDrinkLock: SimpleLock;

    /**
 * @author Ricardo Mejias
 * @param  {[string]} name [description]
 * @param setValue Dispatch - String.
 * @param inputStyle Estilos CSS para el input tag.
 * @param containerStyle Estilos CSS para el div padre que encierra el label tag y el input tag.
 * @param label Tipo string. Si no hay label ni error, solo existirá el input dentro del div contenedor.
 * @param error Tipo string. Usar en conjunto con setError. La variable que almacena el error y su setter deben estar en el componente padre de este input.
 * @param type Tipo del input. Texto, numerico, date, etc.
 * @param name Tipo string. Cadena que linkea el label con su input correspondiente.
 * @param required Tipo bool.
 * @param disabled Tipo bool.
 * @returns Un div como padre, input html tag como hijo y componente principal.
 */
    constructor({
        name,
        preparationTime,
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

    /** 
     * Takes incoming orders, decides whether or not to accept
     * them.
     * @param order The order to be handled.
     * @returns True if accepted, false otherwise. If true,
     * proceeds to prepare the drink with no further notification.
     */
    handleIncomingOrder(order: Order): boolean {
        let acquired = this.shouldPrepareDrinkLock.acquire();
        // If true, no other request is being checked whether or not
        // to be prepared.
        if (acquired) {
            let shouldPrepareDrink = this.shouldPrepareDrink(order);
            if (shouldPrepareDrink) {
                this.modifyDrinkLockWaitingCount += 1;
                if (!this.currentAction) {
                    this.setCurrentAction({
                        drink: order.drink,
                        count: 0,
                    });
                }
            }
            this.shouldPrepareDrinkLock.release();
            if (shouldPrepareDrink) {
                this.prepareDrink();
                return true;
            }
        }
        return false;
    }

    /**
     * 
     * @param order 
     * @returns True if the drink can be prepared.
     */
    private shouldPrepareDrink(order: Order): boolean {
        // No preparation allowed if drink type is not recognized
        if (!this.preparationCapacity.get(order.drink)) return false;
        // If the bartender is idle, then the recognized drink can prepared
        if (!this.currentAction) return true;
        // Only drinks of the same type of drink being prepared at
        // any given moment, and not exceeding its maximum capacity
        return order.drink === this.currentAction.drink && this.currentAction.count < this.preparationCapacity.get(order.drink);
    }

    private prepareDrink() {
        this.incrementDrinksCount();
        // The bartender is taking their time to prepare the drink
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
        // Waiting for the turn to be allowed to
        // modify the current drink's count
        while (!this.modifyDrinkCountLock.acquire()) {
        }

        // Waiting for the turn to be allowed to
        // modify the type of drink, in case the
        // current drink is the only one waiting to be
        // prepared.
        while (!this.shouldPrepareDrinkLock.acquire()) {
        }

        // A negative value represents a drink has been
        // served, hence one order left the waiting line.
        if (n < 0) {
            this.modifyDrinkLockWaitingCount -= 1;
        }
        // If waiting line is empty, resets the current action.
        if (this.modifyDrinkLockWaitingCount == 0) {
            this.setCurrentAction(undefined);
        }
        else {
            let _tempCurrentAction = this.currentAction;
            _tempCurrentAction.count += n;
            this.setCurrentAction(_tempCurrentAction);
        }
        // Releasing both locks for further orders.
        this.shouldPrepareDrinkLock.release();
        this.modifyDrinkCountLock.release();
    }
}

export default Bartender;
