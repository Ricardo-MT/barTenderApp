import expressLoader from './express';
import Logger from './logger';


const indexLoader =  async () => {

    const app = await expressLoader();
    Logger.info('Express initialiazed');

    return { app };


    // ... more loaders can be here

    // ... Initialize agenda
    // ... or Redis, or whatever you want
}

export default indexLoader;