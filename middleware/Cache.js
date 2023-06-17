const Cache = require('../config/redis');

const cacheMiddleware = async (req, res, next) => {
    const cacheKey = (savedUrl._id).toString();
    const cachedUrl = await Cache.redis.get(cacheKey);
  
    if (cachedUrl) {
        return res.json({ status: true, url: JSON.parse(cachedUrl) })
    }
    next();
  }
  
  module.exports = {cacheMiddleware};