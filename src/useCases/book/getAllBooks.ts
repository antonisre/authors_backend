import { IBookAdapter } from '../../adapters/book';

export const getAllBooks = (bookAdapter: IBookAdapter) => ({
    execute: async (page: number, results: number) => {
        return await bookAdapter.getAllBooks(page, results);
    }
})