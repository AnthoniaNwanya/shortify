require("dotenv").config();
const Redis = require('redis');


const REDIS_USERNAME = process.env.REDIS_USERNAME
const REDIS_PORT = process.env.REDIS_PORT 
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PASSWORD = process.env.REDIS_PASSWORD 

class Cache {
    constructor() {
        this.redis = null;
    }

    async connect() {
        try {
            this.redis = await Redis.createClient({
                url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
            });

            this.redis.connect()

            this.redis.on('connect', () => {
                console.log('Redis connected')
            })

            this.redis.on('error', (err) => {
                console.log(err)
            })

    
        } catch (error) {
            console.log(error)
        }

    }
}

const instance = new Cache();

module.exports = instance;