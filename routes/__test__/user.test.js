const app = require('../../app');
const request = require('supertest');
const { authenticatedUserToken } = require('../../helpers/test/AuthTestHelper');
const randomstring = require('randomstring');
const BASE_URI = `/api`;
const USER_PATH = `/users`;
const UserModel = require('../../model/UserModel');

describe('USER ROUTES', () => {
    const USER_URI = `${ BASE_URI + USER_PATH }`; 
    describe('POST /api/users', () => {
        const authToken = authenticatedUserToken();
        it('returns status code 200 if create user is successful', async () => {
            const params = {
                first_name: randomstring.generate(7),
                last_name: randomstring.generate(7),
                address: randomstring.generate(7),
                post_code: randomstring.generate(7),
                phone_number: randomstring.generate(7),
                email: randomstring.generate(7),
                username: randomstring.generate(7),
                password: randomstring.generate(7),
            };
            const res = await request(app).post(`${ USER_URI }`)
                            .set('Authorization', `Bearer ${ authToken }`)
                            .send(params);
            expect(res.statusCode).toEqual(200);
        });
        it('returns status code 400 if create user parameters is not valid', async () => {
            const params = {
                first_name: null,
                last_name: null,
                address: null,
                post_code: null,
                phone_number: null,
                email: null,
                username: null,
                password: null,
            };
            const res = await request(app).post(`${ USER_URI }`)
                            .set('Authorization', `Bearer ${ authToken }`)
                            .send(params);
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('GET /api/users', () => {
        const authToken = authenticatedUserToken();
        it('returns status code 200 if get users is successful', async () => {
            const res = await request(app).get(`${ USER_URI }`)
                            .set('Authorization', `Bearer ${ authToken }`)
                            .send();
            expect(res.statusCode).toEqual(200);
        });
        it('returns status code 401 if there is no auth token', async () => {
            const res = await request(app).get(`${ USER_URI }`)
                            .send();
            expect(res.statusCode).toEqual(401);
        });
        it('returns status code 401 if the auth token is malformed', async () => {
            const malformedAuth = 'ionvwoinvwev';
            const res = await request(app).get(`${ USER_URI }`)
                            .set('Authorization', `Bearer ${ malformedAuth }`)
                            .send();
            expect(res.statusCode).toEqual(401);
        });
    });
    
    describe('GET /api/users/:id', () => {
        const authToken = authenticatedUserToken();
        const validUserId = '151d5223-6db7-426c-87c9-111c6ecd6d39';
        const invalidUserId = 'abc';
        it('returns status code 200 if get user is successful', async () => {
            const res = await request(app).get(`${ USER_URI + '/' + validUserId }`)
                            .set('Authorization', `Bearer ${ authToken }`)
                            .send();
            expect(res.statusCode).toEqual(200);
        });
        it('returns status code 401 if there is no auth token', async () => {
            const res = await request(app).get(`${ USER_URI + '/' + validUserId }`)
                            .send();
            expect(res.statusCode).toEqual(401);
        });
        it('returns status code 401 if the auth token is malformed', async () => {
            const malformedAuth = 'ionvwoinvwev';
            const res = await request(app).get(`${ USER_URI + '/' + validUserId }`)
                            .set('Authorization', `Bearer ${ malformedAuth }`)
                            .send();
            expect(res.statusCode).toEqual(401);
        });
        it('returns status code 404 if get user is not found', async () => {
            const res = await request(app).get(`${ USER_URI + '/' + invalidUserId }`)
                            .set('Authorization', `Bearer ${ authToken }`)
                            .send();
            expect(res.statusCode).toEqual(404);
        });
    });

    describe('UPDATE /api/users/:id', () => {
        const authToken = authenticatedUserToken();
        const validUserId = '151d5223-6db7-426c-87c9-111c6ecd6d39';
        const params = {
            first_name: randomstring.generate(7),
            last_name: randomstring.generate(7),
            address: randomstring.generate(7),
            post_code: randomstring.generate(7),
            phone_number: randomstring.generate(7),
            email: randomstring.generate(7),
            username: randomstring.generate(7),
            password: randomstring.generate(7),
        };

        it('returns status code 200 if update user is successful', async () => {
            const res = await request(app).put(`${ USER_URI + '/' + validUserId }`)
                            .set('Authorization', `Bearer ${ authToken }`)
                            .send(params);
            expect(res.statusCode).toEqual(200);
        });
        it('returns status code 401 if there is no auth token', async () => {
            const res = await request(app).put(`${ USER_URI + '/' + validUserId }`)
                            .send(params);
            expect(res.statusCode).toEqual(401);
        });
        it('returns status code 401 if the auth token is malformed', async () => {
            const malformedAuth = 'ionvwoinvwev';
            const res = await request(app).put(`${ USER_URI + '/' + validUserId }`)
                            .set('Authorization', `Bearer ${ malformedAuth }`)
                            .send(params);
            expect(res.statusCode).toEqual(401);
        });
        it('returns status code 400 if update user parameters is not valid', async () => {
            const invalidParams = {
                wrong: null,
                params: null,
            };
            const res = await request(app).put(`${ USER_URI + '/' + validUserId }`)
                            .set('Authorization', `Bearer ${ authToken }`)
                            .send(invalidParams);
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('DELETE /api/users/:id', () => {
        const authToken = authenticatedUserToken();
        const validUserId = '151d5223-6db7-426c-87c9-111c6ecd6d39';

        it('returns status code 200 if update user is successful', async () => {
            const userParams = {
                first_name: 'Dummy',
                last_name: 'Dummyson',
                address: 'Dummy',
                post_code: '0000',
                phone_number: '+6391112223333',
                email: 'dummy@email.com',
                username: 'dummy00',
                password: 'dummypass',
            };
            await UserModel.createUser(userParams);
            const result = await UserModel.getUserByEmail('dummy@email.com');
            let user = null;
            if(result) {
                user = result[0];
            }
            const res = await request(app).delete(`${ USER_URI + '/' + user.id }`)
                            .set('Authorization', `Bearer ${ authToken }`)
                            .send();
            expect(res.statusCode).toEqual(200);
        });
        it('returns status code 401 if there is no auth token', async () => {
            const res = await request(app).delete(`${ USER_URI + '/' + validUserId }`)
                            .send();
            expect(res.statusCode).toEqual(401);
        });
        it('returns status code 401 if the auth token is malformed', async () => {
            const malformedAuth = 'ionvwoinvwev';
            const res = await request(app).delete(`${ USER_URI + '/' + validUserId }`)
                            .set('Authorization', `Bearer ${ malformedAuth }`)
                            .send();
            expect(res.statusCode).toEqual(401);
        });
        it('returns status code 404 if delete user id is not found', async () => {
            const res = await request(app).delete(`${ USER_URI + '/' }`)
                            .set('Authorization', `Bearer ${ authToken }`)
                            .send();
            expect(res.statusCode).toEqual(404);
        });
    });
});