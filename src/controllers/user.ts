import { successResponse, errorResponse } from '../utils/responseHandler';
import { Request, Response } from 'express';
import { userAdapter } from '../adapters/user';
import userUseCases from '../useCases/user';
import { generateToken } from '../utils/tokenHandler';
import { comparePasswords } from '../utils/bcrypt';
import { StatusCodes } from 'http-status-codes';

export const signup = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const newUserAdapter = userAdapter({ firstName, lastName, email, password });

        const existingUser = await userUseCases.findByEmail(newUserAdapter);
        if (existingUser.length > 0) throw { message: "Email address has already been taken", statusCode: StatusCodes.CONFLICT }

        const newUser = await userUseCases.userSignup(newUserAdapter);
        const token = generateToken(newUser.insertId);

        successResponse(res, { data: { user: {
            firstName,
            lastName,
            email,
            token
        }}});

    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const newUserAdapter = userAdapter({ email, password });
        const user = await userUseCases.findByEmail(newUserAdapter);

        if (user.length == 0) throw { message: "User not found", statusCode: StatusCodes.NOT_FOUND };
        if (!comparePasswords(password, user[0].password)) throw { message: "Wrong password" };

        const token = generateToken(user.insertId);

        successResponse(res, { data: { user: { token }}});

    } catch (err) {
        console.log(err);
        errorResponse(res, err);
    }
}