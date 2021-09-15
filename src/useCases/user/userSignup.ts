import { IUserAdapter } from '../../adapters/user';
import { IUser } from '../../entities/user';

export const userSignup = (userAdapter: IUserAdapter) => ({
    execute: async (user: Partial<IUser>) => {
        const newUser = await userAdapter.createUser(user);
        return newUser;
    }
})