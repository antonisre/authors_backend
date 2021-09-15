import { IUserAdapter } from '../../adapters/user';

export const getAllUsers = (userAdapter: IUserAdapter) => ({
    execute: async (page: number, results: number) => {
        return await userAdapter.getAllUsers(page, results);
    }
})