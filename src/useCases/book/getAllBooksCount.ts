import { IBookAdapter } from '../../adapters/book';

export const getAllBooksCount = (bookAdapter: IBookAdapter) => ({
    execute: async () => {
        return await bookAdapter.getAllBokksCount();
    }
})