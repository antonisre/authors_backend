import { IBook } from '../entities/book';
import db from '../config/database';
import { DatabaseSchemaResult } from '../types/params';
import { ResultSetHeader } from 'mysql2';

export const createBook = async (book: Partial<IBook>): Promise<DatabaseSchemaResult> => {
    const { title, published, authorId } = book;

    try {
        const [result] = await db.query("INSERT INTO Books (title, published, authorId) VALUES(?, ?, ?)", 
            [title, published, authorId]
        );
        return result;
    } catch (err) {
        console.log("Failed to create book", err);
        throw { message: "Failed to create book"};
    }
}

export const deleteAuthorsBooks = async (id: number): Promise<number> => {
    try {
        const [rows] = await db.query("DELETE FROM Books where authorId = ?", [id]);
        return (rows as ResultSetHeader).affectedRows;
    } catch (err) {
        console.log("Failed to delete author's books", err);
        throw { message: "Failed to delete author's books"};
    }
}

export const deleteBook = async (id: number): Promise<number> => {
    try {
        const [rows] = await db.query("DELETE FROM Books where id = ?", [id]);
        return (rows as ResultSetHeader).affectedRows;
    } catch (err) {
        console.log("Failed to delete book", err);
        throw { message: "Failed to delete book"};
    }
}

export const findById = async (id: number): Promise<DatabaseSchemaResult> => {
    try {
        const [rows] = await db.query("SELECT * FROM Books where id = ?", [id]);
        return rows;
    } catch (err) {
        console.log("Failed to find book", err);
        throw { message: "Failed to find book"};
    }
}

export const getAllBooks = async (page: number, resultsPerPage: number): Promise<DatabaseSchemaResult> => {
    const offset = (page - 1) * resultsPerPage;

    try {
        const [rows] = await db.query(`SELECT Books.*, JSON_OBJECT('firstName', Users.firstName, 'lastName', Users.lastName, 
            'email', Users.email, 'role', Users.role) as author FROM Books INNER JOIN Users ON Users.id = Books.authorId LIMIT ?, ?`, 
            [offset, resultsPerPage]
        );
        return rows;
    } catch (err) {
        console.log("Failed to fetch books", err);
        throw { message: "Failed to fetch books"};
    }
}

export const getAllBooksCount = async (): Promise<number> => {

    try {
        const [rows] = await db.query(`SELECT COUNT(*) as bookCount FROM Books INNER JOIN Users ON Users.id = Books.authorId`);
        return rows[0].bookCount;
    } catch (err) {
        console.log("Failed to count all books", err);
        throw { message: "Failed to count all books"};
    }
}

export const updateBook = async (book: Partial<IBook>): Promise<number> => {
    try {
        const values = [];
        let query = "UPDATE Books SET "
        Object.keys(book).forEach(key => {
            if (key !== "id" && key !== "authorId") {
                query = query + `${key} = ?,`
                values.push(book[key])
            }
        })

        query = query.replace(/,\s*$/, ""); //remove trailing comma
        query = query + " WHERE id = ? AND authorId = ?";
        values.push(book.id, book.authorId);

        const [rows] = await db.query(query, values);
        return (rows as ResultSetHeader).affectedRows;
    } catch (err) {
        console.log("Failed to update book", err);
        throw { message: "Failed to update book"};
    }
}