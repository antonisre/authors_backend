import { IBookAdapter } from '../../adapters/book';

export const deleteAuthorsBooks = (bookAdapter: IBookAdapter) => ({
    execute: async (id: number) => { 
        await bookAdapter.deleteAuthorsBooks(id);
    }
})