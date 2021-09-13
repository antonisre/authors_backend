import { IUser } from '../entities/user';
import db from '../config/database';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

type DatabaseSchemaResult = RowDataPacket[] | RowDataPacket[][] | ResultSetHeader | OkPacket[] | OkPacket;

export const createUser = async (user: Partial<IUser>): Promise<DatabaseSchemaResult> => {
    const { firstName, lastName, email, password } = user;

    try {
        const [result] = await db.query("INSERT INTO Users (firstName, lastName, email, password) VALUES(?, ?, ?, ?)", 
            [firstName, lastName, email, password]
        );
        return result;
    } catch (err) {
        console.log("Failed to create user", err);
        throw { message: "Failed to create user" };
    }
}

export const findByEmail = async (email: string): Promise<DatabaseSchemaResult> => {
    try {
        const [rows] = await db.query("SELECT * FROM Users where email = ?", [email]);
        return rows;
    } catch (err) {
        console.log("Failed to find user", err);
        throw { message: "Failed to find user" };
    }
}

export const deleteUser = async (id: number): Promise<void> => {
    try {
        await db.query("DELETE FROM Users where id = ?", [id]);
    } catch (err) {
        console.log("Failed to delete user", err);
        throw { message: "Failed to delete user" };
    }
}

export const updateUser = async (user: Partial<IUser>) => {
    try {
        const values = [];
        let query = "UPDATE Users SET "
        Object.keys(user).forEach(key => {
            if (key !== "id" ) {
                query = query + `${key} = ?,`
                values.push(user[key])
            }
        })

        query = query.replace(/,\s*$/, ""); //remove trailing comma
        query = query + " WHERE id = ?";
        values.push(user.id);
     
        const [rows] = await db.query(query, values);
        return rows;
    } catch (err) {
        console.log("Failed to update user", err);
        throw { message: "Failed to update user" };
    }
}