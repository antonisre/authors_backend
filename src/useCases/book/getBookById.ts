import { IBookAdapter } from '../../adapters/book';

export const getBookById = (bookAdapter: IBookAdapter) => ({
    execute: async (id: number) => {
        return await bookAdapter.findById(id);
    }
})