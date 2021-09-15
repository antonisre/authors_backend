import { IUser } from '../entities/user';
import db from '../config/database';
import { ResultSetHeader } from 'mysql2';
import { DatabaseSchemaResult } from '../types/params';

export const createUser = async (user: Partial<IUser>): Promise<DatabaseSchemaResult> => {
    let { firstName, lastName, email, password, role } = user;

    try {
        const [result] = await db.query("INSERT INTO Users (firstName, lastName, email, password, role) VALUES(?, ?, ?, ?, ?)", 
            [firstName, lastName, email, password, role]
        );
        return result;
    } catch (err) {
        console.log("Failed to create user", err);
        throw { message: "Failed to create user" };
    }
}

export const deleteUser = async (id: number): Promise<Number> => {
    try {
        const [rows] = await db.query("DELETE FROM Users where id = ?", [id]);
        return (rows as ResultSetHeader).affectedRows;
    } catch (err) {
        console.log("Failed to delete user", err);
        throw { message: "Failed to delete user" };
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

export const getAllUsers = async (page: number, resultsPerPage: number): Promise<DatabaseSchemaResult> => {
    const offset = (page - 1) * resultsPerPage;
    
    try {
        const [rows] = await db.query(`SELECT Users.firstName, Users.lastName, Users.email, Users.role, Users.id FROM Users
            LIMIT ?, ?`, [offset, resultsPerPage]);
        return rows;
    } catch (err) {
        console.log("Failed to find all users", err);
        throw { message: "Failed to find all users" };
    }
}

export const getAllUsersCount = async (): Promise<number> => {
    try {
        const [rows] = await db.query("SELECT COUNT(*) as usersCount FROM Users");
        return rows[0].usersCount;
    } catch (err) {
        console.log("Failed to find user count", err);
        throw { message: "Failed to find user count" };
    }
}

export const getUserBooks = async (id: number, page: number, resultsPerPage: number): Promise<DatabaseSchemaResult> => {
    const offset = (page - 1) * resultsPerPage;
    console.log(id, offset, resultsPerPage)
    try {
        const [rows] = await db.query(`SELECT *, JSON_ARRAYAGG(JSON_OBJECT('id', b.id, 'title', b.title, 'published', b.published)) as books
        FROM (select * from Books LIMIT ?, ?) b LEFT join Users u on u.id = b.authorId where b.authorId = ?;`, 
        [offset, resultsPerPage, id]);
        return rows[0];
    } catch (err) {
        console.log("Failed to find user", err);
        throw { message: "Failed to find user books" };
    }
}

export const getUserBooksCount = async (id: number): Promise<number> => {
    try {
        const [rows] = await db.query(`SELECT COUNT(*) as bookCount FROM Users INNER JOIN Books ON Users.id = Books.authorId 
            WHERE Users.id = ?`, [id]);
        return rows[0].bookCount;
    } catch (err) {
        console.log("Failed to find user", err);
        throw { message: "Failed to count user's books" };
    }
}

export const updateUser = async (user: Partial<IUser>): Promise<Number> => {
    try {
        const values = [];
        let query = "UPDATE Users SET "
        Object.keys(user).forEach(key => {
            if (key !== "id" && user[key]) {
                query = query + `${key} = ?,`
                values.push(user[key])
            }
        })

        query = query.replace(/,\s*$/, ""); //remove trailing comma
        query = query + " WHERE id = ?";
        values.push(user.id);
     
        const [rows] = await db.query(query, values);
        return (rows as ResultSetHeader).affectedRows;
    } catch (err) {
        console.log("Failed to update user", err);
        throw { message: "Failed to update user" };
    }
}