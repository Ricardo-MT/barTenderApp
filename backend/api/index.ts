import { Router } from 'express';
import authenticationRoutes from './routes/authentication.routes';

export default () => {
    const app = Router();
    authenticationRoutes(app);
    return app;
};