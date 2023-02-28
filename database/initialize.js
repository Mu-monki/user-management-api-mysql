const db = require('../config/db');
const fs = require('fs');

const createUserTableQuery = fs.readFileSync('database/sql/UserTable.sql', {
    encoding: 'utf-8'
});
db.query(createUserTableQuery, (err, res, fields) => {
    console.log('error', err);
    console.log('result', res);
    console.log('fields', fields);
});