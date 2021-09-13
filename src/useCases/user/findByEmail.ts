import { IUserAdapter } from '../../adapters/user';

export const findByEmail = (userAdapter: IUserAdapter) => ({
    execute: async (email: string) => {
        return await userAdapter.findByEmail(email);
    }
})