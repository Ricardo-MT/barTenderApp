import AWS, { CloudFront } from 'aws-sdk';
import * as S3 from "aws-sdk/clients/s3";
import config from "../config";
import {Request, Response} from 'express';

class FileServices{
    private s3 : S3;

    constructor(){
        AWS.config.update({
            accessKeyId: config.IAM_ID_KEY,
            secretAccessKey: config.IAM_SECRET_KEY,
            region: config.s3_region,
        });
        
        this.s3 = new AWS.S3({apiVersion: '2006-03-01'});
    }

    private uploadFile = (file, path) : Promise<string> => {
        const uploadParams = {
            Bucket      : config.s3_bucket,
            Key         : path,
            Body        : file
        };

        return new Promise((resolve,reject) => {
            this.s3.upload(uploadParams,(err,data) => {
                if(err) reject(err);
                resolve(data.Location);
            });
        });
    };

    public generateCookies = () : CloudFront.Signer.CustomPolicy=> { 
        //Expira en 15 días.
        let expireDate = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 15;
        
        //KeyPairId
        let keyId = config.keyPublicId;
        
        //PrivateKey
        let privateKey = config.privateKeyCloudFront.replace(/\\n/gm, '\n');

        let privateUrl = config.PRIVATE_CDN_URL;

        const policy = JSON.stringify({
            Statement: [
              {
                Resource: privateUrl,
                Condition: {
                  DateLessThan: {
                    'AWS:EpochTime':
                      expireDate,
                  },
                },
              },
            ],
          });


        //GENERAR COOKIE FIRMADA
        let signer = new AWS.CloudFront.Signer(keyId, privateKey);

        let signedCookie = signer.getSignedCookie({ policy });

        return signedCookie;
    }


    public removeFilesFromS3 = async(keys:string[]) => {
        let objectsToDelete = [];
        keys.forEach(key => {
            objectsToDelete.push({Key:key});
        });
        const deleteParams = {
            Bucket: config.s3_bucket,
            Delete: {
                Objects:objectsToDelete
            }
        };
        let err, data = await new Promise((resolve,reject) => {
            this.s3.deleteObjects(deleteParams,(err,data) => {
                if(err){
                    reject(err);
                }
                resolve(data);
            });
        });
        if(err) throw err;
        return data;
    };

    public processFile = (req:Request) : Promise<{file:any, fileName:string}> => {
        //Procesa el fichero y elimina los espacios por "_"
        req.pipe(req.busboy);
        return new Promise<{file:any, fileName:string}>((resolve, reject) => {
            req.busboy.on('file', (fieldname, file, filename) => {
                let name = filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('_');
                resolve({file:file, fileName:name});
            })
        })
    } 


    //Método que recibiendo en el body un fichero y un destino en s3 (filePath) procesa y sube ese fichero devolviendo la localizacion en su CDN (Dependiendo de si es privado o no) y su localización real en s3 (key para luego eliminar)
    public uploadAndProcessFile = (req:Request, filePath:string, privateFile?:boolean) : Promise<{filelocation:string, filePath:string}> => {
        return new Promise<{filelocation:string, filePath:string}>((resolve, reject) => {
            this.processFile(req).then(response => {
                if(response){
                    let path = filePath + response.fileName
                    this.uploadFile(response.file,path).then(location => {
                        const filelocation: string = (privateFile ? config.PRIVATE_CDN_URL : config.CDN_URL) + "/" + location.split(config.s3_url)[1];
                        resolve({filelocation, filePath:path});
                    }).catch(err => reject(err));
                }else{
                    resolve({filelocation:"", filePath:""});
                }
            }).catch(err => reject(err));
        });
    }
}

export default new FileServices();