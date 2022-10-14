import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import OrderController from '../../controllers/order.controllers';
const route = Router();

export default (app: Router) => {
    const orderController = new OrderController;
    app.use('/order', route);
    route.post('/',
        celebrate({
            body: Joi.object({
                user: Joi.number().empty('').required(),
                drink: Joi.string().empty('').valid('BEER', 'DRINK').required(),
            }),
        }),
        orderController.handleIncomingOrder);

    route.get('/',
        orderController.getOrders);
}