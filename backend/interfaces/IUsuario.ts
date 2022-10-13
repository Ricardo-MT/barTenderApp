export interface IUser {
    _id: string;
    email: string;
    username: string;
    password: String;
    salt: Buffer;
    updated_for: string;
    validPassword(password: String): Promise<Boolean>;
    encryptPassword(password: String): Promise<{ salt: Buffer, hashedPassword: String, err: Error }>;
}

export interface IPublicUser {
    _id: string;
    email: string;
    username:string;
}

