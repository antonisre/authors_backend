import { IUser } from '../entities/user';
import * as userDB from '../database/user';
import { hashPassword } from '../utils/bcrypt';
import { StatusCodes } from 'http-status-codes';

export interface IUserAdapter {
    createUser(user: Partial<IUser>),
    findByEmail(email: string),
    deleteUser(id: number),
    updateUser(user: Partial<IUser>)
}

export const userAdapter = (): IUserAdapter => ({
    createUser: async (user: Partial<IUser>) => {
        user.password = hashPassword(user.password);
        if (!user.password) throw { message: "Failed to hash password" };

        const result = await userDB.createUser({ 
            firstName: user.firstName, 
            lastName: user.lastName, 
            email: user.email, 
            password: user.password ,
            role: user.role
        })
        return result;
    },
    findByEmail: async (email: string) => {
        const userData = await userDB.findByEmail(email);
        return userData;
    },
    deleteUser: async (id: number) => {
        const deletedData = await userDB.deleteUser(id);
        if ( deletedData == 0) throw { message: "User not found", statusCode: StatusCodes.NOT_FOUND };
    },
    updateUser: async (user: Partial<IUser>) => {
        if (user.password) user.password = hashPassword(user.password);
        const updatedData = await userDB.updateUser(user);
        if ( updatedData == 0) throw { message: "User not found", statusCode: StatusCodes.NOT_FOUND };
    },
})