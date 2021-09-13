import { successResponse, errorResponse } from '../utils/responseHandler';
import { Request, Response } from 'express';
import { bookAdapter } from '../adapters/book';
import bookUseCases from '../useCases/book';
import { StatusCodes } from 'http-status-codes';

export const addNewBook = async (req: Request, res: Response) => {
    try {
        const newBookAdapter = bookAdapter();
        const newBook = await bookUseCases.newBook(newBookAdapter).execute(req.body)

        successResponse(res, { data: { book: {
            ...req.body,
            id: newBook?.insertId
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
        const updateInfo = await bookUseCases.updateBook(newBookAdapter).execute({...req.body, id: req.params.id });
        if (updateInfo.affectedRows == 0) throw { message: "Book not found!" };

        successResponse(res, { data: { book : { ...req.body }}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}