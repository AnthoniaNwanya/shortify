const jwt = require("jsonwebtoken");
const { BadRequestError } = require("./Error");

const authenticateUser = (req, res, next) => {
        const jwttoken = req.headers.authorization

        if ((!jwttoken) || jwttoken.split(' ')[0] !== 'Bearer') {
            throw new BadRequestError("Enter token");
        }

        const tokenArray = jwttoken.split(' ')[1]
        const tokenVerify = jwt.verify(tokenArray, process.env.TOKEN_KEY);
        req.User = tokenVerify;
        next();

};

module.exports = { authenticateUser };
