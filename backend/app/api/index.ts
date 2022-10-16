import { Router } from 'express';
import orderRoutes from './routes/order.routes';

export default () => {
    const app = Router();
    orderRoutes(app);
    return app;
};