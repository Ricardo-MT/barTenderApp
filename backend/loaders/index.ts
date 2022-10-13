import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';


const indexLoader =  async () => {

    const mongoConnection = await mongooseLoader();
    Logger.info('MongoDB inicializado');
    const app = await expressLoader(mongoConnection);
    Logger.info('Express inicializado');

    return { app, connection: mongoConnection };


    // ... more loaders can be here

    // ... Initialize agenda
    // ... or Redis, or whatever you want
}

export default indexLoader;