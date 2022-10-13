import passport from 'passport';
import Usuario from '../models/usuario.model'
import { IUser, IPublicUser } from '../interfaces/IUsuario';

const passportLoader =  async () => {
    passport.serializeUser(function (user: IPublicUser, done) {
        done(null, user._id);
    })
    passport.deserializeUser(function (id, done) {
        Usuario.findById(id, function (err, user: IUser) {
            if (err) throw err;
            if (user) {
                done(err, {
                    _id: user._id,
                    email: user.email,
                    username:user.username
                });

            } else done(err, null);
        });
    })
}

export default passportLoader;