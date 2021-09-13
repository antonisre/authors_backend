import { Request, Response, Next } from "express";
import { validateToken } from "../utils/tokenHandler";
import { errorResponse } from '../utils/responseHandler';
import { StatusCodes } from 'http-status-codes';

export const requireToken = (req: Request, res: Response, next: Next) => {
    const token = req.headers.token;

    try {
        const tokenData = validateToken(token);
        if (tokenData.role != "admin") throw { statusCode: StatusCodes.FORBIDDEN, message: "Forbidden!" };

        next();
    } catch (err) {
        console.log(err);
        errorResponse(res, err)
    }
}