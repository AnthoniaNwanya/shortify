const request = require('supertest');
const { connect } = require('./database');
const UserSchema = require('../schema/UserSchema');
const UrlSchema = require('../schema/UrlSchema');
const app = require('../index');

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

    it('return all users', async () => {
        const response = await request(app).get('/api/user')
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Users retrieved successfully');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toStrictEqual([]);
        expect(response.body.data).toHaveLength(0);
    });

    it('return a user by email', async () => {
        const user = await UserSchema.create({
            username: 'testname',
            email: 'test@mail.com',
            password: 'test123',
        });
        const response = await request(app).get('/api/user' + user.email)
            .set('content-type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User retrieved successfully'); 
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data).toHaveProperty('URLS', []);
        expect(response.body.data).toHaveProperty('email', 'test@mail.com');
        expect(response.body.data).toHaveProperty('username', 'testname');
        expect(response.body.data).not.toHaveProperty('password');
    });

    it('return user account update by id', async () => {
        const user = await UserSchema.create({
            username: 'testname',
            email: 'test@mail.com',
            password: 'test123',
        });
        const response = await request(app).put('/api/user' + user.id)
            .set('content-type', 'application/json')
            .send({
                username: 'updatename',
                email: 'update@mail.com',
                password: 'update123',
            })
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User update was successful');
        expect(response.body.data).toHaveProperty('username', 'updatename'); 
        expect(response.body.data).toHaveProperty('email', 'update@mail.com');
        expect(response.body.data).toHaveProperty('password','update123' );
    });

    it('delete user account by id', async () => {
        const user = await UserSchema.create({
            username: 'deletetname',
            email: 'delete@mail.com',
            password: 'delete123',
        });
        const response = await request(app).delete('/api/user' + user.id)
            .set('content-type', 'application/json')
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('Successfully deleted user');
    });

});
