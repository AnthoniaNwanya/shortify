const UserSchema = require("../schema/UserSchema");
const { NotFoundError, BadRequestError, ForbiddenError, ValidationError } = require("../middleware/Error");

const create = async (data) => {
    try {
        const existingUser = await UserSchema.findOne({ "email": data.email });
        if (existingUser) {
            throw new ForbiddenError("User already exists");
        };
        const createUser = await UserSchema.create(data);
        return createUser
    } catch (err) {
        throw new BadRequestError("Unable to create user");
    };
};

const getUsers = async (data) => {
    const users = await UserSchema.find({});
    if (!users) {
        throw new NotFoundError("Users not found");
    }
    return users;
};

const getOne = async (email) => {
    if (!email) {
        throw new ValidationError("email is required")
    }
    let foundUser = await UserSchema.findOne({ "email": email });
    if (!foundUser) {
        throw new NotFoundError("User not found")
    }

    return foundUser
};

const getHistory = async (email) => {
    if (!email) {
        throw new ValidationError("email is required")
    }
    let foundUser = await UserSchema.findOne({ "email": email });
    if (!foundUser) {
        throw new NotFoundError("User not found")
    }
    foundUser = foundUser.URLS;
    return foundUser
};

const updateOne = async (id, userUpdate) => {
    const update = await UserSchema.findByIdAndUpdate(id, userUpdate, {
        new: true,
    });
    update.updatedAt = new Date();
    await update.save();

    if (!update || id === undefined) {
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
    create,
    getUsers,
    getOne,
    getHistory,
    updateOne,
    deleteOne,
};
