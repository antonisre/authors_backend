import { IUser } from '../entities/user';
import * as userDB from '../database/user';
import { hashPassword } from '../utils/bcrypt';

export interface IUserAdapter extends Partial<IUser> {
    createUser(user: IUser),
    findByEmail(email: string),
    deleteUser(id: number)
}

export const userAdapter = (user): IUserAdapter => ({
    createUser: async () => {
        user.password = hashPassword(user.password);
        if (!user.password) throw { message: "Failed to hash password" };

        const result = await userDB.createUser({ 
            firstName: user.firstName, 
            lastName: user.lastName, 
            email: user.email, 
            password: user.password 
        })
        return result;
    },
    findByEmail: async () => {
        const userData = await userDB.findByEmail(user.email);
        return userData;
    },
    deleteUser: async () => {
        await userDB.deleteUser(user.id);
    }
})