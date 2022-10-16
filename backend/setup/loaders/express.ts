import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../../app/api';
import config from '../config';
import busboy from 'connect-busboy';
import { isCelebrateError } from 'celebrate';

export default async (): Promise<Application> => {

    const app = express();

    app.get('/status', (req, res) => {
        return res.status(200).json({ status: 200, serverStatus: "Server online" });
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    app.use(express.static('../public'));
    const corsConfig = {
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ["OPTIONS", "CONNECT", "HEAD", "GET", "PATCH", "POST"],
        allowedHeaders: ["Content-Type", 'Access-Control-Allow-Origin', "Access-Control-Allow-Methods", "Authorization", "Accept", "Origin", "Cookie", "Connection"],
        exposedHeaders: ["Access-Control-Allow-Origin"],
    };

    app.use(cors(corsConfig));
    app.disable('x-powered-by');
    app.use(busboy());
    app.use(helmet());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.use(config.api.prefix, express.static('api/data'))

    // Load API routes
    app.use(config.api.prefix, routes());
    app.use(customErrors);

    return app;
}

// API Joi validation error handler
const customErrors = (err, req, res, next) => {
    if (!isCelebrateError(err)) {
        return next(err);
    }
    const {
        message,
    } = err;

    const result = {
        statusCode: 400,
        error: `Bad Request: ${message}`,
        message: "Bad request",
    };

    return res.status(400).send(result);
}
