const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { v4 } =  require('uuid');

const users = async () => {
    const query = "SELECT id, first_name, last_name, address, post_code, phone_number, email, username, password, created_at, updated_at, is_active FROM users";
    return new Promise((resolve, reject) => {
        db.query(query, (err, res, fields) => {
            if(err) {
                throw err;
            }
            return resolve(res);
        });
    });
}

const user = async (id) => {
    const query = "SELECT id, first_name, last_name, address, post_code, phone_number, email, username, password, created_at, updated_at, is_active FROM users WHERE id = ? LIMIT 1";
    const bindData = [
        id
    ];
    return new Promise((resolve, reject) => {
        db.query(query, bindData, (err, res, fields) => {
            if(err) {
                throw err;
            }
            return resolve(res);
        });
    });
}

const createUser = async (params) => {
    const query = "INSERT INTO users (id, first_name, last_name, address, post_code, phone_number, email, username, password, is_active) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const bindData = [
        v4(),
        params.first_name,
        params.last_name,
        params.address,
        params.post_code,
        params.phone_number,
        params.email,
        params.username,
        bcrypt.hashSync(params.password),
        1
    ];
    return new Promise((resolve, reject) => {
        db.query(query, bindData, (err, res, fields) => {
            if(err) {
                throw err;
            }
            return resolve(res);
        });
    });
}

const updateUser = async (id, params) => {
    console.log('MODEL', id);
    const query = "UPDATE users SET first_name = ?, last_name = ?, address = ?, post_code = ?, phone_number = ?, email = ?, username = ?, password = ?, updated_at = ?, is_active = ? WHERE id = ?";
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const bindData = [
        params.first_name,
        params.last_name,
        params.address,
        params.post_code,
        params.phone_number,
        params.email,
        params.username,
        bcrypt.hashSync(params.password),
        datetime,
        1,
        id
    ];
    return new Promise((resolve, reject) => {
        db.query(query, bindData, (err, res, fields) => {
            if(err) {
                throw err;
            }
            return resolve(res);
        });
    });
}

const deleteUser = async (id) => {
    const query = "DELETE FROM users WHERE id = ?";
    const bindData = [
        id
    ];
    return new Promise((resolve, reject) => {
        db.query(query, bindData, (err, res, fields) => {
            if(err) {
                throw err;
            }
            return resolve(res);
        });
    });
}

const deleteUsers = async (ids) => {
    const query = "DELETE FROM users WHERE id in (?)";
    const bindData = [
        ids
    ];
    return new Promise((resolve, reject) => {
        db.query(query, bindData, (err, res, fields) => {
            if(err) {
                throw err;
            }
            return resolve(res);
        });
    });
}

const getUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = ? LIMIT 1";
    const bindData = [
        email
    ];
    return new Promise((resolve, reject) => {
        db.query(query, bindData, (err, res, fields) => {
            if(err) {
                throw err;
            }
            return resolve(res);
        });
    });
}

module.exports = {
    users,
    user,
    createUser,
    updateUser,
    deleteUser,
    deleteUsers,
    getUserByEmail
}