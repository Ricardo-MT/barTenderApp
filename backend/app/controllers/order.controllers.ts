import { Request, Response, } from 'express';
import Logger from '../../setup/loaders/logger'
import Order from '../models/Order/order';
import OrderService from '../services/order.services';

export default class OrderController {
    private orderService: OrderService;
    constructor() {
        this.orderService = new OrderService();
    }

    public handleIncomingOrder = async (req: Request, res: Response,) => {
        try {
            const { user, drink } = req.body;

            const canServeDrink = this.orderService.handleIncomingOrder(new Order({
                user: Number(user),
                drink
            }));

            if (canServeDrink) {
                return res.status(200).json({ status: 200, message: 'Drink will be served shortly' });
            }
            return res.status(429).json({ status: 429, message: 'Drink request cannot be processed at the moment. Please try again later' });
        } catch (e) {
            Logger.error(e);
            return res.status(400).json({ status: 400, message: 'Server error' });
        }
    }

    public getOrders = async (req: Request, res: Response,) => {
        try {
            let orders = this.orderService.getOrders();
            const skip = req.query.skip != null ? Number(req.query.skip) : 0;
            let limit = req.query.limit != null ? Number(req.query.limit) : (orders.length - skip);
            orders = orders.slice(skip, skip + limit);

            res.status(200).json({ status: 200, orders });
        } catch (e) {
            Logger.error(e);
            return res.status(400).json({ status: 400, message: 'Server error' });
        }
    }
}