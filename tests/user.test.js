const request = require('supertest');
const { connect } = require('./database');
const UserSchema = require('../schema/UserSchema');
const UrlSchema = require('../schema/UrlSchema');
const app = require('../index');
const userController = require('../controller/userController');

describe('User Route', () => {
    let conn;
    let user
    beforeAll(async () => {
        conn = await connect();
        const createuser = await UserSchema.create({ username: 'tonia', email: 'tonia@mail.com', password: '123456' });

user = createuser
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
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.data).toHaveLength(1);
    });

    it('return a user by email', async () => {
     
         const createUser = await UserSchema.create({ username: 'testname', email: 'test@mail.com', password: '1234567' });

        const response = await request(app).get('/api/user/' + createUser.email)
          
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User retrieved successfully'); 
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data).toHaveProperty('URLS', []);
        expect(response.body.data).toHaveProperty('email', 'test@mail.com');
        expect(response.body.data).toHaveProperty('username', 'testname');
        // expect(response.body.data).not.toHaveProperty('password');
    });

    it('return user account update by id', async () => {
        const createUser = await UserSchema.create({
            username: 'testname',
            email: 'test@mail.com',
            password: 'test123',
        });

        const response = await request(app).post('/api/user/update/' + createUser.id)
            // .set('content-type', 'application/json')
            .set('Cookie', 'TOKEN_KEY=saehior384u09ujrjejskbdv3u6y749283o')
            .send({
                username: 'updatename',
                email: 'update@mail.com',
                password: 'update123',
            })
            // console.log(response)
        // expect(response.status).toBe(200);
        expect(response.headers.location).toMatch("/api/dashboard")
        // expect(response.body).toHaveProperty('message', 'User update was successful');
        // expect(response.body.data).toHaveProperty('username', 'updatename'); 
        // expect(response.body.data).toHaveProperty('email', 'update@mail.com');
        // expect(response.body.data).toHaveProperty('password','update123' );
    });

    it('delete user account by id', async () => {
        const createUser = await UserSchema.create({
            username: 'deletetname',
            email: 'delete@mail.com',
            password: 'delete123',
        });
        const response = await request(app).post('/api/user/delete/' + createUser._id)
            .set('content-type', 'application/json')
        // expect(response.status).toBe(200);
        expect(response.headers.location).toMatch("/api/login")
        // expect(response.body.message).toEqual('Successfully deleted user');
    });

});
