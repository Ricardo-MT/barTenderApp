import express from 'express';
import cors from 'cors';
import Logger from './logger';
import helmet from 'helmet';
import routes from '../api';
import config from '../config';
import busboy from 'connect-busboy';
import { isCelebrate } from 'celebrate';

export default async (): Promise<express.Application> => {

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
const customErrors = (err, req, res, next) => {
    if (!isCelebrate(err)) {
        return next(err);
    }
    const {
        joi,
        meta,
    } = err;

    const result = {
        statusCode: 400,
        error: `Bad Request: ${joi.message}`,
        message: "Bad request",
        validation: {
            source: meta.source,
            keys: [],
        },
    };

    return res.status(400).send(result);
}
