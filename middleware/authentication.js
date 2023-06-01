const jwt = require("jsonwebtoken");
// const { BadRequestError } = require("./Error");

const authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies.token
        const user = jwt.verify(token, process.env.TOKEN_KEY);
        req.User = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.redirect("/api/login")
    }

};

module.exports = { authenticateUser };
