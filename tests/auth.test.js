const request = require('supertest');
const { connect } = require('./database');
const UserSchema = require('../schema/UserSchema');
const app = require('../index');
require("dotenv").config();

describe('User Route', () => {
    let conn;
    beforeAll(async () => {
        conn = await connect();
    })

    afterEach(async () => {
        await conn.cleanup();
    })

    afterAll(async () => {
        await conn.disconnect();
    });
    it('create a user', async () => {
        const response = await request(app).post('/')
            .set('content-type', 'application/json')
            .send({
                username: 'testname',
                email: 'test@mail.com',
                password: 'test123',
            })
        expect(response.headers.location).toMatch("/login")
    });

        it('should throw error if user already exists ', async () => {
         await request(app).post('/')
            .set('content-type', 'application/json')
            .send({
                username: 'testname',
                email: 'test@mail.com',
                password: 'test123',
            })
        const response = await request(app).post('/')
            .set('content-type', 'application/json')
            .send({
                username: 'testname',
                email: 'test@mail.com',
                password: 'test123',
            })

        expect(response.body).not.toBe(302);
        expect(response.body).toHaveProperty('message', 'User already exists');
    });

    it('should login a user and redirect to home page, with set token in headers', async () => {
        const user = await UserSchema.create({
            username: 'testname',
            email: 'test@mail.com',
            password: 'test123',
        });
        const response = await request(app).post('/login')
            .set('content-type', 'application/json')
            .send({
                email: 'test@mail.com',
            })
        const cookies = response.headers['set-cookie']

        expect(response.headers.location).toMatch("/api/shortify")
        expect(response.headers).toHaveProperty('set-cookie');

    });

    it('should throw error on incorrect login', async () => {
        const user = await UserSchema.create({
            username: 'testname',
            email: 'test@mail.com',
            password: 'test123',
        });
        const response = await request(app).post('/login')
            .set('content-type', 'application/json')
            .send({
                email: 'notexist@mail.com',
            })
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', 'User does not exist');
        expect(response.body).not.toHaveProperty('data');
    });
})