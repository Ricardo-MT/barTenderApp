import { AxiosInstance } from 'axios';
import { IDrink } from '../../models/Drink/drink';
import { IOrder } from '../../models/Order/order';

class OrderEndpoints {
    axios: AxiosInstance;
    route: string;
    limit: number;

    constructor(appApi: AxiosInstance) {
        this.axios = appApi;
        this.route = '/order';
        this.limit = 20;
    }

    async getOrders(skip = 0): Promise<{ orders: Array<IOrder>, message?: string }> {
        return (await this.axios.get<{ orders: Array<IOrder>, message?: string }>(`${this.route}?skip=${skip}&limit=${this.limit}`)).data;
    }

    async requestDrink(drink: IDrink): Promise<{ message?: string }> {
        return (await this.axios.post<{ message?: string }>(this.route, {
            user: 34, drink
        })).data;
    }
}

export default OrderEndpoints;
