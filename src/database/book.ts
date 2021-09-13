import { IBook } from '../entities/book';
import db from '../config/database';
import { DatabaseSchemaResult } from '../types/params';

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

export const findById = async (id: number): Promise<DatabaseSchemaResult> => {
    try {
        const [rows] = await db.query("SELECT * FROM Books where id = ?", [id]);
        return rows;
    } catch (err) {
        console.log("Failed to find book", err);
        throw { message: "Failed to find book"};
    }
}

export const deleteBook = async (id: number): Promise<void> => {
    try {
        await db.query("DELETE FROM Books where id = ?", [id]);
    } catch (err) {
        console.log("Failed to delete book", err);
        throw { message: "Failed to delete book"};
    }
}

export const updateBook = async (book: Partial<IBook>): Promise<DatabaseSchemaResult> => {
    try {
        const values = [];
        let query = "UPDATE Books SET "
        Object.keys(book).forEach(key => {
            if (key !== "id" ) {
                query = query + `${key} = ?,`
                values.push(book[key])
            }
        })

        query = query.replace(/,\s*$/, ""); //remove trailing comma
        query = query + " WHERE id = ?";
        values.push(book.id);
     
        const [rows] = await db.query(query, values);
        return rows;
    } catch (err) {
        console.log("Failed to update book", err);
        throw { message: "Failed to update book"};
    }
}