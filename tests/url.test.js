require("dotenv").config();
const request = require('supertest');
const { connect } = require('./database');
const UserSchema = require('../schema/UserSchema');
const UrlSchema = require('../schema/UrlSchema');
const app = require('../index');
const { nanoid } = require("nanoid");


describe('Url Route', () => {
    let conn;
    let loginToken;

    beforeAll(async () => {
        conn = await connect()

        await UserSchema.create({ username: 'tonia', email: 'tonia@mail.com', password: '123456' });

        const login = await request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ email: 'tonia@mail.com' })

        loginToken = login.body.data;
    });

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('generate random shortened url', async () => {
        const response = await request(app)
            .post('/api/shortify')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${loginToken}`)
            .send({
                origUrl: "https://github.com/AnthoniaNwanya"
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'URL created');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual(expect.any(String));
    });

    it('generate custom shortened url', async () => {
        await UserSchema.create({ username: 'tonia', email: 'tonia@mail.com', password: '123456' });

        const login = await request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ email: 'tonia@mail.com' })

        loginToken = login.body.data;

        const customId = "tonia";
        const response = await request(app)
            .post('/api/shortify')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${loginToken}`)
            .send({
                origUrl: "https://github.com/AnthoniaNwanya",
                customId: "tonia"
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'URL created');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBe(`${process.env.BASE}/${customId}`);
    });

    it('return array of urls created', async () => {
        const user = await UserSchema.create({ username: 'tonia', email: 'tonia@mail.com', password: '123456' });

        const login = await request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ email: 'tonia@mail.com' })

        loginToken = login.body.data;

        const BASE = process.env.BASE;
        const urlId = nanoid(5);
        await UrlSchema.create({
            urlId: urlId,
            origUrl: "https://github.com/AnthoniaNwanya",
            shortUrl: (`${BASE}/${urlId}`),
            User: user.email,
            createdAt: new Date(),
        });

        const response = await request(app)
            .get('/api/shortify/history')
            .set('Authorization', `Bearer ${loginToken}`)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual(expect.any(Array));

    });

    it('redirect to original url onclick of shortened url', async () => {
        const user = await UserSchema.create({ username: 'tonia', email: 'tonia@mail.com', password: '123456' });

        const login = await request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ email: 'tonia@mail.com' })

        loginToken = login.body.data;

        const BASE = process.env.BASE;
        const urlId = nanoid(5);
        await UrlSchema.create({
            urlId: urlId,
            origUrl: "https://github.com/AnthoniaNwanya",
            shortUrl: (`${BASE}/${urlId}`),
            User: user.email,
            createdAt: new Date(),
        });

        const response = await request(app)
            .get('/' + urlId)

            expect(response.headers.location).toMatch("https://github.com/AnthoniaNwanya")
    });


});