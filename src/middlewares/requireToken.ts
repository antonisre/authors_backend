import { Request, Response, Next } from "express";
import { validateToken } from "../utils/tokenHandler";
import { errorResponse } from '../utils/responseHandler'

export const requireToken = (req: Request, res: Response, next: Next) => {
    const token = req.headers.token;

    try {
        const tokenData = validateToken(token);
        req.user = tokenData.data.id;
        next();
    } catch (err) {
        console.log(err);
        errorResponse(res, err)
    }
}