import { IBook } from '../entities/book';
import * as bookDB from '../database/book';

export interface IBookAdapter {
    createBook(user: Partial<IBook>),
    findById(id: number),
    deleteBook(id: number),
    updateBook(user: Partial<IBook>)
}

export const bookAdapter = (): IBookAdapter => ({
    createBook: async (book: Partial<IBook>) => {
        const result = await bookDB.createBook({ 
            title: book.title, 
            published: book.published, 
            authorId: book.authorId, 
        })
        return result;
    },
    findById: async (id: number) => {
        const books = await bookDB.findById(id);
        return books;
    },
    deleteBook: async (id: number) => {
        await bookDB.deleteBook(id);
    },
    updateBook: async (book: Partial<IBook>) => {
        const updateInfo = await bookDB.updateBook(book);
        return updateInfo;
    },
})