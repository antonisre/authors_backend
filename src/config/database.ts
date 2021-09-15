import mysql from 'mysql2';
import env from '../config/env';

const connection = mysql.createPool({
    host: env.HDB_HOST,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    waitForConnections: true
});

connection.getConnection((err) => {
    if (err) console.log(JSON.stringify(err));
});

export default connection.promise();


