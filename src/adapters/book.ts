import { IBook } from '../entities/book';
import * as bookDB from '../database/book';
import { StatusCodes } from 'http-status-codes';

export interface IBookAdapter {
    createBook(user: Partial<IBook>),
    findById(id: number),
    deleteAuthorsBooks(authorId: number),
    deleteBook(id: number),
    updateBook(user: Partial<IBook>),
    getAllBooks(page: number, results: number),
    getAllBokksCount()
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
    deleteAuthorsBooks: async (authorId: number) => {
        const deletedBooks = await bookDB.deleteAuthorsBooks(authorId);
        if (deletedBooks == 0) throw { message: "Author not found", statusCode: StatusCodes.NOT_FOUND };
    },
    deleteBook: async (id: number) => {
        const deleteBooks = await bookDB.deleteBook(id);
        if (deleteBooks == 0) throw { message: "Book not found", statusCode: StatusCodes.NOT_FOUND };
    },
    findById: async (id: number) => {
        const books = await bookDB.findById(id);
        return books;
    },
    getAllBooks: async (page: number, results: number) => {
        const books = await bookDB.getAllBooks(page, results);
        return books;
    },
    getAllBokksCount: async () => {
        const bookCount = await bookDB.getAllBooksCount();
        return bookCount;
    },
    updateBook: async (book: Partial<IBook>) => {
        const updatedBook = await bookDB.updateBook(book);
        if (updatedBook == 0 ) throw { message: "Only existing books can be updated by the authors", statusCode: StatusCodes.BAD_REQUEST };
    },
})