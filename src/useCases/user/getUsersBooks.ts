import { IUserAdapter } from '../../adapters/user';

export const getUsersBooks = (userAdapter: IUserAdapter) => ({
    execute: async (id: number) => {
        return await userAdapter.getUserBooks(id);
    }
})