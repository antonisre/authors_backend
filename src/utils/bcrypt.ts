import bcrypt from 'bcrypt';
import env from '../config/env';

export const hashPassword = (password: string) => {
    const hashPassword = bcrypt.hashSync(password, parseInt(env.SALT_ROUNDS));
    return hashPassword;
}

export const comparePasswords = (enteredPassword: string, userPassword: string) => {
    const result = bcrypt.compareSync(enteredPassword, userPassword);
    return result;
}