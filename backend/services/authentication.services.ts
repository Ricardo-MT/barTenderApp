import Usuario from '../models/usuario.model';
import { IPublicUser } from '../interfaces/IUsuario';

class AuthenticationService {
    constructor() { }

    public login = async (email: string, password: string): Promise<{ user: IPublicUser, correct: Boolean }> => {
        var correct: Boolean = false;
        try {
            let err, user = await Usuario.findOne({ $or: [{ username: email }, { email: email }] }).select("+password");
            if (err) throw err;

            if (user)
                correct = await user.validPassword(password);

            if (correct) {
                //Quitar todas las propiedades además de estas que no sean públicas.
                let {password, salt, validPassword, encryptPassword, ...publicUser} = user;
                return { user:publicUser, correct: true };
            } else return { user: null, correct: false }
        } catch (e) {
            throw e;
        }
    }
}

export default new AuthenticationService();