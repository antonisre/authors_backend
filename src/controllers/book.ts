import { successResponse, errorResponse } from '../utils/responseHandler';
import { Request, Response } from 'express';
import { bookAdapter } from '../adapters/book';
import bookUseCases from '../useCases/book';

export const addNewBook = async (req: Request, res: Response) => {
    try {
        const newBookAdapter = bookAdapter();
        const authorId = req.user;
        const newBook = await bookUseCases.newBook(newBookAdapter).execute({ ...req.body, authorId });

        successResponse(res, { data: { book: {
            ...req.body,
            id: newBook?.insertId,
            authorId
        }}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const newBookAdapter = bookAdapter();
        const book = await bookUseCases.getBookById(newBookAdapter).execute(req.params.id);

        successResponse(res, { data: { book}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const newBookAdapter = bookAdapter();
        await bookUseCases.deleteBook(newBookAdapter).execute(req.params.id);

        successResponse(res, { data: {}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const newBookAdapter = bookAdapter();
        const authorId = req.user;
        await bookUseCases.updateBook(newBookAdapter).execute({...req.body, id: req.params.id, authorId });

        successResponse(res, { data: { book : { ...req.body }}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const { page, results } = req.query;
        const newBookAdapter = bookAdapter();

        const books = await bookUseCases.getAllBooks(newBookAdapter).execute(page, results);

        successResponse(res, { data: { books }});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

