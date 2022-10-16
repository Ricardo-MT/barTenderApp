import expressLoader from './express';
import Logger from './logger';


const indexLoader = async () => {

    const app = await expressLoader();
    Logger.info('Express initialiazed');

    return { app };
}

export default indexLoader;