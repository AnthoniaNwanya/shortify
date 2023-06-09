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
        const response = await request(app).post('/api/signup')
            .set('content-type', 'application/json')
            .send({
                username: 'testname',
                email: 'test@mail.com',
                password: 'test123',
            })
            expect(response.headers.location).toMatch("/api/login")
        // expect(response.status).toBe(201);
        // expect(response.body).not.toBe(200);
        // expect(response.body).toHaveProperty('message', 'User created successfully');
        // expect(response.body).not.toHaveProperty('password');
    });


    it('login a user and give token', async () => {
        const user = await UserSchema.create({
            username: 'testname',
            email: 'test@mail.com',
            password: 'test123',
        }); 
        const response = await request(app).post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'test@mail.com',
            })
            expect(response.headers.location).toMatch("/api/shortify")
        // expect(response.status).toBe(200);
        // expect(response.body).not.toBe(201);
        // expect(response.body).toHaveProperty('message', 'Token generated');
        // expect(response.body).toHaveProperty('data');
    });

    it('throw error on incorrect login', async () => {
        const user = await UserSchema.create({
            username: 'testname',
            email: 'test@mail.com',
            password: 'test123',
        }); 
        const response = await request(app).post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'notexist@mail.com',
            })
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', 'User does not exist');
        expect(response.body).not.toHaveProperty('data');
    });
})