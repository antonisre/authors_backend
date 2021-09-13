import { IUserAdapter } from '../../adapters/user';

export const deleteUser = async (userAdapter: IUserAdapter) => {
    const { id } = userAdapter;
    return await userAdapter.deleteUser(id);
    
}