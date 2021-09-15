import jwt from "jsonwebtoken";
import env from '../config/env';
import { StatusCodes } from 'http-status-codes';

export const generateToken = (id: number, role: string) => {
    try {
        const secret = env.JWT_SECRET;
        const tokenValidInterval = parseInt(env.JWT_EXPIRES);
        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + tokenValidInterval, data: { id, role }}, secret);
        return token;
    } catch (err) {
        console.log(err);
        throw { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: "Failed to create token!" };
    }
}

export const validateToken = (token: string) => {
    try {
        const secret = env.JWT_SECRET;
        const decodedToken = jwt.verify(token, secret);
        return decodedToken;
      } catch(err) {
        console.log(err);
        throw { statusCode: StatusCodes.UNAUTHORIZED, message: "Invalid token." };
      }
}