const service = require("../service/userService");
const UserSchema = require("../schema/UserSchema");
const formatResponse = require("../middleware/Response");
const { ForbiddenError } = require("../middleware/Error");
const jwt = require("jsonwebtoken");

module.exports = {

  signup: async (req, res, next) => {

    try {
      const { username, email, password } = req.body;
      const existingUser = await UserSchema.findOne({ "email": email });
      if (existingUser) {
        req.flash("signupFail", "! Account with this email already exists.")
        res.redirect("/")
      }
      if (!existingUser) {
        const newUser = await UserSchema.create({
          username: username,
          email: email,
          password: password,
          createdAt: new Date(),
        });
        await newUser.save();
        return res.redirect("/login")
      }
    } catch (err) {
      next(err)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const existingUser = await UserSchema.findOne({ "email": email, "password": password });

      if (!existingUser) {
        req.flash("loginFail", "! User does not exist. Cross-check email or password")
        res.redirect("/login")
      } else {
        const signWith = { id: existingUser._id, username: existingUser.username, email: existingUser.email, password: existingUser.password };
        const token = jwt.sign(signWith, process.env.TOKEN_KEY, { expiresIn: "1h" });
        res.cookie("token", token, {
          httpOnly: true,
        })
        return res.redirect("/api/shortify")
      }
    } catch (err) {
      next(err)
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const foundUsers = await service.getUsers();
      formatResponse({
        res,
        data: foundUsers,
        statusCode: 200,
        message: "Users retrieved successfully"
      })
    } catch (err) {
      next(err)
    }

  },

  getOne: async (req, res, next) => {
    try {
      const { email } = req.params;
      const userFound = await service.getOne(email);
      formatResponse({
        res,
        statusCode: 200,
        data: userFound,
        message: "User retrieved successfully"
      });
    } catch (err) {
      next(err)
    }

  },

  updateOne: async (req, res, next) => {
    const id = req.params.id;
    const { username, email, password } = req.body;

    try {
      await service.updateOne(id, {
        username: username,
        email: email,
        password: password,
      });
      req.flash("updateSuccess", "Settings saved successfully!")
      res.redirect("/api/user/update/:id")

    } catch (err) {
      next(err)
    }
  },

  deleteOne: async (req, res, next) => {
    const id = req.params.id
    try {
      await service.deleteOne(id);
      res.redirect("/")

    } catch (err) {
      next(err)
    }
  },
};