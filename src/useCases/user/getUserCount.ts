import { IUserAdapter } from '../../adapters/user';

export const getUsersCount = (userAdapter: IUserAdapter) => ({
    execute: async () => {
        return await userAdapter.getAllUsersCount();
    }
})