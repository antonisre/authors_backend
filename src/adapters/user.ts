import { IUser } from '../entities/user';
import * as userDB from '../database/user';
import { hashPassword } from '../utils/bcrypt';
import { StatusCodes } from 'http-status-codes';

export interface IUserAdapter {
    createUser(user: Partial<IUser>),
    findByEmail(email: string),
    deleteUser(id: number),
    updateUser(user: Partial<IUser>),
    getAllUsers(page: number, results: number),
    getAllUsersCount(),
    getUserBooks(userId: number, page: number, results: number),
    getUserBooksCount(userId: number)
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
    deleteUser: async (id: number) => {
        const deletedData = await userDB.deleteUser(id);
        if ( deletedData == 0) throw { message: "User not found", statusCode: StatusCodes.NOT_FOUND };
    },
    findByEmail: async (email: string) => {
        const userData = await userDB.findByEmail(email);
        return userData;
    },
    getAllUsers: async (page: number, results: number) => {
        const users = await userDB.getAllUsers(page, results);
        return users;
    },
    getAllUsersCount: async () => {
        const userCount = await userDB.getAllUsersCount();
        return userCount;
    },
    getUserBooks: async (userId: number, page: number, results: number) => {
        const userBooks = await userDB.getUserBooks(userId, page, results);
        return userBooks;
    },
    getUserBooksCount: (userId: number) => {
        const userBooksCount = userDB.getUserBooksCount(userId);
        return userBooksCount;
    },
    updateUser: async (user: Partial<IUser>) => {
        if (user.password) user.password = hashPassword(user.password);
        const updatedData = await userDB.updateUser(user);
        if ( updatedData == 0) throw { message: "User not found", statusCode: StatusCodes.NOT_FOUND };
    }
})