import { successResponse, errorResponse } from '../utils/responseHandler';
import { Request, Response } from 'express';
import { userAdapter } from '../adapters/user';
import userUseCases from '../useCases/user';
import { generateToken } from '../utils/tokenHandler';
import { comparePasswords } from '../utils/bcrypt';
import { StatusCodes } from 'http-status-codes';
import { defaultUserRole } from '../config/constants';

export const signup = async (req: Request, res: Response) => {
    try {
        let { firstName, lastName, email, password, role } = req.body;
        const newUserAdapter = userAdapter();
        if(!role) role = defaultUserRole;

        const existingUser = await userUseCases.findByEmail(newUserAdapter).execute(email);
        if (existingUser.length > 0) throw { message: "Email address has already been taken", statusCode: StatusCodes.CONFLICT }

        const newUser = await userUseCases.userSignup(newUserAdapter).execute({ firstName, lastName, email, password, role });
        const token = generateToken(newUser.insertId, role);

        successResponse(res, { data: { user: {
            firstName,
            lastName,
            email,
            token,
            id: newUser.insertId
        }}});
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

        successResponse(res, { data: { user: { token, firstName: user[0].firstName, lastName: user[0].lastName }}});
    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newUserAdapter = userAdapter();
        await userUseCases.deleteUser(newUserAdapter).execute(id);
    
        successResponse(res, { data: {}});
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