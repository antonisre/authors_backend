import { IUser } from '../entities/user';
import db from '../config/database';

export const createUser = async (user: Partial<IUser>) => {
    const { firstName, lastName, email, password } = user;

    try {
        const [result] = await db.query("INSERT INTO Users (firstName, lastName, email, password) VALUES(?, ?, ?, ?)", 
            [firstName, lastName, email, password]
        );
        return result;
    } catch (err) {
        console.log("Failed to create user", err);
    }
}

export const findByEmail = async (email: string) => {
    try {
        const [rows] = await db.query("SELECT * FROM Users where email = ?", [email]);
        return rows;
    } catch (err) {
        console.log("Failed to find user", err);
    }
}