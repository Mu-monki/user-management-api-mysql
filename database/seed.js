const { faker } = require('@faker-js/faker');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { v4: uuid, v4 } =  require('uuid');

const default_iterations = 10;
const iterations = process.env.npm_config_iterations? process.env.npm_config_iterations: default_iterations;

// Create Default Test User
const createDefaultUserQuery = "INSERT INTO users (id, first_name, last_name, address, post_code, phone_number, email, username, password, is_active) VALUES (?)";
const params = [
    'default-user-id',
    'John',
    'Doe',
    '123 Test St',
    '1010',
    '(+63) 911 222 3333',
    'test-admin@email.com',
    'tester-admin',
    bcrypt.hashSync('Password_123'),
    1
];
db.query(
    createDefaultUserQuery,
    [params],
    (err, res) => {
        console.log('err', err);
        console.log('res', res);
    }
);

// Create Seeded Users
const createUserQuery = "INSERT INTO users (id, first_name, last_name, address, post_code, phone_number, email, username, password, is_active) VALUES ?";
let data_arr = [];
for(let i = 0; i < iterations; i++) {
    const data = {
        id: v4(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.streetAddress(),
        post_code: faker.address.zipCode(),
        phone_number: faker.phone.number(),
        email: faker.internet.email(),
        username: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password()),
        is_active: 1
    }
    console.log('data', data);
    data_arr.push(data);
}

console.log('data_arr', data_arr);

db.query(
    createUserQuery,
    [data_arr.map(data => [data.id, data.first_name, data.last_name, data.address, data.post_code, data.phone_number, data.email, data.username, data.password, data.is_active])],
    (err, res) => {
        console.log('err', err);
        console.log('res', res);
    }
);