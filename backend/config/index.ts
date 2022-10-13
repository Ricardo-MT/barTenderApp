import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️ Configuration file .env missing  ⚠️");
}

const configVariables =  {
    //EXECUTION PORT
    port: process.env.port,
    //ENVIRONMENT MODE (dev OR prod)
    mode: process.env.mode,
    //API PATH
    api: {
        prefix: '/api'
    },
    //API URL
    URL: process.env.URL,
    //CLIENT URL
    CLIENT_URL: process.env.CLIENT_URL,
}

export default configVariables;