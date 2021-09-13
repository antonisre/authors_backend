import { IUserAdapter } from '../../adapters/user';

export const userSignup = async (userAdapter: IUserAdapter) => {
    const { firstName, lastName, password, role, email} = userAdapter;
    return await userAdapter.createUser({ firstName, lastName, password, role, email });
    
}