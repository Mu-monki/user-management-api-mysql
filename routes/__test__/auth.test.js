const app = require('../../app');
const request = require('supertest');
const BASE_URI = `/api`;
const AUTH_PATH = `/auth`;

describe('AUTH ROUTES', () => {
    describe('POST /api/auth/login', () => {
        const LOGIN_URI = `${ BASE_URI + AUTH_PATH }/login`;
    
        it('returns status code 200 if login is successful', async () => {
            const params = {
                email: 'test-admin@email.com',
                password: 'Password_123'
            };
            const res = await request(app).post(`${ LOGIN_URI }`).send(params);
            expect(res.statusCode).toEqual(200);
        });
        it('returns status code 400 if login failed', async () => {
            const params = {
                email: 'invalid@email.com',
                password: 'invalid_pw'
            };
            const res = await request(app).post(`${ LOGIN_URI }`).send(params);
            expect(res.statusCode).toEqual(400);
        });
    }); 
});