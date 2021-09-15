import { IBookAdapter } from '../../adapters/book';

export const deleteBook = (bookAdapter: IBookAdapter) => ({
    execute: async (id: number) => { 
        await bookAdapter.deleteBook(id);
    }
})