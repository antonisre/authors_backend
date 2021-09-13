import { Request, Response, Next } from "express";
import { validateToken } from "../utils/tokenHandler";
import { errorResponse } from '../utils/responseHandler'

export const requireToken = (req: Request, res: Response, next: Next) => {
    const token = req.headers.token;

    try {
        validateToken(token);
        next();
    } catch (err) {
        console.log(err);
        errorResponse(res, err)
    }
}