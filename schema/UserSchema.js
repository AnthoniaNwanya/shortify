const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const UserSignupSchema = new mongoose.Schema({
  id: ObjectId,
  username: {
    type: String,
    required: [true, "can't be blank"],
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
  },
  URLS: [
    {
      type: String,
      ref: "URL",
    },
  ],
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSignupSchema);
