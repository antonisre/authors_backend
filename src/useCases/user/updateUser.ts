import { IUserAdapter } from '../../adapters/user';
import { IUser } from '../../entities/user';

export const updateUser = (userAdapter: IUserAdapter) => ({
    execute: async (user: Partial<IUser>) => {
        const updatedUser = await userAdapter.updateUser(user);
        return updatedUser;
    }
})