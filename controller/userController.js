const service = require("../service/userService");
const formatResponse = require("../middleware/Response");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await service.create({
        username,
        email,
        password,
        createdAt: new Date(),
      });
      formatResponse({
        res,
        message: "User created successfully",
        statusCode: 201
      });
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
        message: "User retrieved successfully"
      })
    } catch (err) {
      next(err)
    }

  },

  getOne: async (req, res, next) => {
    try {
      const {email} = req.params;
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

  getHistory: async (req, res, next) => {
    try {
      const {email} = req.params;
      const userFound = await service.getHistory(email);
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
    const userUpdate = req.body;
    try {
      const updatedUser = await service.updateOne(id, userUpdate);
      formatResponse({
        res,
        statusCode: 200,
        message: "User update was successful",
      });
    } catch (err) {
      next(err)
    }
  },

  deleteOne: async (req, res, next) => {
    const id = req.params.id;
    try {
      const deletedUser = await service.deleteOne(id);
      formatResponse({
        res,
        statusCode: 200,
        message: "Successfully deleted user",
      });
    } catch (err) {
      next(err)
    }
  },
};