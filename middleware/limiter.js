const limiter = require("express-rate-limit");

const rateLimiter = limiter({
        windowMs: 10 * 60 * 1000, 
        max: 50,
        message: 'You have exceeded the 50 requests in 10 minutes limit!', 
        standardHeaders: true,
        legacyHeaders: false,
        
})

module.exports = {rateLimiter};
