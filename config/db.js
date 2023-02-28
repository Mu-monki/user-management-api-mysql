const mysql = require('mysql');
const dotenv = require('dotenv').config();

const MYSQL_CONFIG = {
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME, 
    multipleStatements: true
};
const db = mysql.createConnection(MYSQL_CONFIG);

console.log('CONFIG', MYSQL_CONFIG);

db.connect((err) => {
    if(err) {
        throw err;
    }
});

module.exports = db;
