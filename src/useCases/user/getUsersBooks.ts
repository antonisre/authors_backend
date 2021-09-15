import { IUserAdapter } from '../../adapters/user';

export const getUsersBooks = (userAdapter: IUserAdapter) => ({
    execute: async (id: number,page: number, results: number) => {
        return await userAdapter.getUserBooks(id, page, results);
    }
})