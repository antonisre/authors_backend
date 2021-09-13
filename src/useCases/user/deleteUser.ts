import { IUserAdapter } from '../../adapters/user';

export const deleteUser = (userAdapter: IUserAdapter) => ({
    execute: async (id: number) => { 
        return await userAdapter.deleteUser(id);
    }
})