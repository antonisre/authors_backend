import { IUser } from '../entities/user';
import * as userDB from '../database/user';
import { hashPassword } from '../utils/bcrypt';

export interface IUserAdapter {
    createUser(user: Partial<IUser>),
    findByEmail(email: string),
    deleteUser(id: number)
}

export const userAdapter = () => ({
    createUser: async (user: Partial<IUser>) => {
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
    findByEmail: async (email: string) => {
        const userData = await userDB.findByEmail(email);
        return userData;
    },
    deleteUser: async (id: number) => {
        await userDB.deleteUser(id);
    }
})