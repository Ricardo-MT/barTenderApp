import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  No hay ningún fichero .env  ⚠️");
}

const configVariables =  {
    //URL DE ACCESSO A MONGODB
    ATLAS_URI: process.env.ATLAS_URI,
    //URL DE ACCESSO A MONGODB TEST
    ATLAS_TEST_URI: process.env.ATLAS_TEST_URI,
    
    //VARIABLES DE LA SESION
    SESS_NAME: process.env.SESS_NAME,
    SESS_SECRET: process.env.SESS_SECRET,
    SESS_LIFETIME: process.env.SESS_LIFETIME,

    //URL DEL CLIENTE (REACT)
    CLIENT_URL: process.env.CLIENT_URL,
    
    //URL DE LA API (PRODUCCION)
    URL: process.env.URL,
    //PUERTO DONDE SE VA EJECUTAR
    port: process.env.port,
    //DIRECTORIO DONDE SE DEFINEN LA API (RUTAS)
    api: {
        prefix: '/api'
    },
    //DIRECTORIO PARA SUIR FICHEROS EN LOCAL
    upload_dir: process.env.upload_dir,
    //MODO DE EJECUCION DEL CODIGO (DESARROLLO O PRODUCCION)
    mode: process.env.mode,
    mongooseConnectionOptions: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    //Variables de amazon
        //Conexion a S3
    IAM_ID_KEY:process.env.AWS_ACCESS_KEY,
    IAM_SECRET_KEY:process.env.AWS_SECRET,
    s3_url:process.env.S3_URL,
    s3_bucket:process.env.S3_BUCKET_NAME,
    s3_region:process.env.S3_REGION,
        //Cookies firmadas
    keyPublicId:process.env.keyPublicKeyId,
    privateKeyCloudFront:process.env.privateKeyCloudFront,

        //URL DEL CDN
    CDN_URL:process.env.CDN_URL,
    PRIVATE_CDN_URL:process.env.PRIVATE_CDN_URL,
    
    amazon_pair_id:process.env.AMAZON_KEY_PAR_ID,
    amazon_private_key:process.env.AMAZON_PRIVATE_KEY,
    
    //Variables del email
    email_pass:process.env.EMAIL_PASS,
    email_user:process.env.EMAIL_USER,
    transport: {
        host: process.env.EMAIL_HOST,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        port: 587,
        secure: false,
    },

    //Variables para la documentacion de la api
    swaggerOptions: {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: ".", //CAMBIAR POR EL TITULO DE LA APP
                version: "1.0.0",
                description:
                    "",
                license: {
                    name: "MIT",
                    url: "https://choosealicense.com/licenses/mit/"
                },
                contact: {
                    name: "",
                    url: "",
                    email: "info@boorpret.com"
                }
            },
            servers: [
                {
                    url: process.env.API_URL,
                    description:""
                }
            ]
        },
        apis: ['./api/routes/*.ts']
    },
}

export default configVariables;