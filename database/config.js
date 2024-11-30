// database/config.js
import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'your_database',
};

export const connectDB = async () => {
    const connection = await mysql.createConnection(config);
    console.log('Database connected successfully!');
    return connection;
};
