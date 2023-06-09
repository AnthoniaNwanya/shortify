const service = require("../service/userService");
const UserSchema = require("../schema/UserSchema");
const formatResponse = require("../middleware/Response");
const { ForbiddenError } = require("../middleware/Error");
const jwt = require("jsonwebtoken");


module.exports = {

  signup: async (req, res, next) => {

    try {
      const { username, email, password } = req.body;

      const newUser = await service.signup({
        username: username,
        email: email,
        password: password,
        createdAt: new Date(),
      });
      await newUser.save();

      // formatResponse({
      //   res,
      //   message: "User created successfully",
      //   statusCode: 201
      // });
      return res.redirect("/api/login")
    } catch (err) {
      next(err)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email } = req.body;

      const existingUser = await UserSchema.findOne({ "email": email });
      if (!existingUser) {
        throw new ForbiddenError("User does not exist");
      };
      const signWith = { id: existingUser._id, username: existingUser.username, email: existingUser.email, password: existingUser.password};
      const token = jwt.sign(signWith, process.env.TOKEN_KEY, { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,
      })
      return res.redirect("/api/shortify")
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
      const { email } = req.params.email;
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
    const {username, email, password} = req.body;
    try {
      const updatedUser = await service.updateOne(id, {
        username: username,
        email: email,
        password: password,
      });
      await updatedUser.save()
      res.redirect("/api/dashboard")
      // formatResponse({
      //   res,
      //   data: updatedUser,
      //   statusCode: 200,
      //   message: "User update was successful",
      // });
    } catch (err) {
      next(err)
    }
  },

  deleteOne: async (req, res, next) => {
    const id = req.params.id
    try {
      const deletedUser = await service.deleteOne(id);
      // res.clearCookie("token")
      res.redirect("/api/signup")
      // res.clearCookie("token");
    //  return 
    // return 
    // res.redirect('/api/signup');
      // formatResponse({
      //   res,
      //   statusCode: 200,
      //   message: "Successfully deleted user",
      // });
    } catch (err) {
      next(err)
    }
  },
};