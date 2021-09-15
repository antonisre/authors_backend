import { successResponse, errorResponse } from '../utils/responseHandler';
import { Request, Response } from 'express';
import { userAdapter } from '../adapters/user';
import { bookAdapter } from '../adapters/book';
import userUseCases from '../useCases/user';
import bookUseCases from '../useCases/book';
import { generateToken } from '../utils/tokenHandler';
import { comparePasswords } from '../utils/bcrypt';
import { StatusCodes } from 'http-status-codes';
import { userRoles } from '../config/constants';
import { pagination } from '../utils/utils';

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newUserAdapter = userAdapter();
        const newBookAdapter = bookAdapter();

        await bookUseCases.deleteAuthorsBooks(newBookAdapter).execute(id);
        await userUseCases.deleteUser(newUserAdapter).execute(id);
    
        successResponse(res, { data: {}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const { page, results } = req.query;
        const newUserAdapter = userAdapter();
        
        let userData = await userUseCases.getAllUsers(newUserAdapter).execute(page, results);
        let userCount = await userUseCases.getUsersCount(newUserAdapter).execute();
        
        if (!userData) userData = { users: [] };
        const pages = pagination(page, results, userCount)
    
        successResponse(res, { data: { userData, pages }});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const getBooks = async (req: Request, res: Response) => {
    try {
        const userId = req.user;
        const { page, results } = req.query;
        const newUserAdapter = userAdapter();
        
        let userData = await userUseCases.getUsersBooks(newUserAdapter).execute(userId, page, results);
        let bookCount = await userUseCases.getUserBooksCount(newUserAdapter).execute(userId);
        if (!userData) userData = { books: [] };
        const pages = pagination(page, results, bookCount)
    
        successResponse(res, { data: { userData, pages }});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const newUserAdapter = userAdapter();
        const user = await userUseCases.findByEmail(newUserAdapter).execute(email);

        if (user.length == 0) throw { message: "User not found", statusCode: StatusCodes.NOT_FOUND };
        if (!comparePasswords(password, user[0].password)) throw { message: "Wrong password", statusCode: StatusCodes.NOT_FOUND };
     
        const token = generateToken(user[0].id, user[0].role);

        successResponse(res, { data: { user: { 
            token, 
            firstName: user[0].firstName, 
            lastName: user[0].lastName,
            id: user[0].id,
            role: user[0].role,
        }}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        let { firstName, lastName, email, password, role } = req.body;
        const newUserAdapter = userAdapter();
        if(!role) role = userRoles.user;

        const existingUser = await userUseCases.findByEmail(newUserAdapter).execute(email);
        if (existingUser.length > 0) throw { message: "Email address has already been taken", statusCode: StatusCodes.CONFLICT }

        const newUser = await userUseCases.userSignup(newUserAdapter).execute({ firstName, lastName, email, password, role });
        const token = generateToken(newUser.insertId, role);

        successResponse(res, { data: { user: {
            firstName,
            lastName,
            email,
            token,
            role,
            id: newUser.insertId
        }}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const newUserAdapter = userAdapter();
        await userUseCases.updateUser(newUserAdapter).execute({ ...req.body, id: req.params.id });
        delete req.body?.password;

        successResponse(res, { data: { user : { ...req.body }}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}