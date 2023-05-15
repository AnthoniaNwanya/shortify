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
        if(!users) {
              throw new NotFoundError("Users not found");
        }
        return users;
};

const getOne = async (email) => {
    if (!email) {
        throw new ValidationError("email is required")
    }
    const foundUser = await UserSchema.findOne({ "email": email });
    if (!foundUser) {
        throw new NotFoundError("User not found")
    }
    return foundUser
};

const updateOne = async (id, userUpdate) => {
    const user = await UserSchema.findOne({ "id": id });
    if (!user) {
        throw new NotFoundError("User not found")
    }
    const update = await UserSchema.findByIdAndUpdate(user, userUpdate, {
        new: true,
    });
    if (!update) {
        throw new BadRequestError("Unable to update user");
    }
    return update;
};

const deleteOne = async (id) => {
        const user = await UserSchema.findOne({ "id": id });
        if (!user) {
            throw new NotFoundError("User not found")
        }
        const deletedUser = await UserSchema.findByIdAndDelete(user);
        if (!user) {
            throw new BadRequestError("Unable to delete user");
        }
        return deletedUser

};
module.exports = {
    create,
    getUsers,
    getOne,
    updateOne,
    deleteOne,
};
