import { IUserAdapter } from '../../adapters/user';

export const getUserBooksCount = (userAdapter: IUserAdapter) => ({
    execute: async (id: number) => {
        return await userAdapter.getUserBooksCount(id);
    }
})