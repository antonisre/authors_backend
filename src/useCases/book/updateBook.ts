import { bookAdapter, IBookAdapter } from '../../adapters/book';
import { IBook } from '../../entities/book';

export const updateBook = (bookAdapter: IBookAdapter) => ({
    execute: async (book: Partial<IBook>) => {
        return await bookAdapter.updateBook(book);
    }
})