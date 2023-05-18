const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
        windowMs: 60 * 1000, 
        max: 5,
        message: 'You have exceeded the 5 requests in 1-minute limit!', 
        standardHeaders: true,
        legacyHeaders: false,
})

module.exports = rateLimiter;
