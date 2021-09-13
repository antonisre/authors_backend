import jwt from "jsonwebtoken";
import env from '../config/env';

export const generateToken = id => {
    try {
        const secret = env.JWT_SECRET;
        const tokenValidInterval = parseInt(env.JWT_EXPIRES);
        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + tokenValidInterval, data: { id }}, secret);
        return token;
    } catch (err) {
        console.log(err);
        throw { statusCode: 500, message: "Failed to create token!" };
    }
}

export const validateToken = token => {
    try {
        const secret = env.JWT_SECRET;
        const decodedToken = jwt.verify(token, secret);
        return decodedToken;
      } catch(err) {
        console.log(err);
        throw { statusCode: 401, message: "Invalid token." };
      }
}