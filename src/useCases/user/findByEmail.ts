import { IUserAdapter } from '../../adapters/user';

export const findByEmail = async (userAdapter: IUserAdapter) => {
    const { email } = userAdapter;
    return await userAdapter.findByEmail(email);
    
}