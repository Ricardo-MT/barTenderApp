import { Request, Response, } from 'express';
import Logger from '../loaders/logger'

export default class AuthenticationController {

    constructor() {    }
    public login = async (req: Request, res: Response,) => {
        try {
            return res.status(401).json({ status: 400, message: 'Wrong credentials' });
        } catch (e) {
            Logger.debug('ERROR EN EL LOGIN')
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public logout = async (req: Request, res: Response,) => {
        try {
            req.logout()
            res.status(200).json({ status: 200, message: 'Logout successful' });
        } catch (e) {
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
}