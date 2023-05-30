const UserSchema = require("../schema/UserSchema");
const { NotFoundError, BadRequestError, ForbiddenError, ValidationError } = require("../middleware/Error");

const signup = async (data) => {
        const existingUser = await UserSchema.findOne({ "email": data.email });
        if (existingUser) {
            throw new ForbiddenError("User already exists");
        } else {
             const createUser = await UserSchema.create(data);
              return createUser
        }
};

const getUsers = async (data) => {
    const users = await UserSchema.find({}, {password:0});
    if (!users) {
        throw new NotFoundError("Users not found");
    }
    return users;
};

const getOne = async (email) => {
    if (!email) {
        throw new ValidationError("email is required")
    }
    let foundUser = await UserSchema.findOne({ "email": email }, {password:0});
    if (!foundUser) {
        throw new NotFoundError("User not found")
    }
    return foundUser
};

const updateOne = async (id, userUpdate) => {
    const update = await UserSchema.findByIdAndUpdate(id, userUpdate, {
        new: true,
    }, );
    update.updatedAt = new Date();
    await update.save();


    if (id === undefined) {
        throw new BadRequestError("User not found");
    } else if (!update) {
        throw new BadRequestError("Unable to update user");
    }

    return update;
};

const deleteOne = async (id) => {
    const deletedUser = await UserSchema.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new BadRequestError("Unable to delete user");
    }
    return deletedUser

};
module.exports = {
    signup,
    getUsers,
    getOne,
    updateOne,
    deleteOne,
};
