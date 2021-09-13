import { IBookAdapter } from '../../adapters/book';
import { IBook } from '../../entities/book';

export const newBook = (bookAdapter: IBookAdapter) => ({
    execute: async (book: Partial<IBook>) => {
        const newBook = await bookAdapter.createBook(book);
        return newBook;
    }
})