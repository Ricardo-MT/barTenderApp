import config from './setup/config';
import Logger from './setup/loaders/logger';

async function startServer(): Promise<void> {

    const { app } = await require('./setup/loaders').default();

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
