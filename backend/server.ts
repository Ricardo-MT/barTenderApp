import config from './config';
import Logger from './loaders/logger';
import path from 'path';

async function startServer(): Promise<void> {

    const { app } = await require('./loaders').default();
    
    app.listen(config.port, err => {
        if (err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
        Logger.info(`
              ################################################
              🛡️  Server listening on port: ${config.port} 🛡️ 
              ################################################
            `);
    });
}
startServer();
