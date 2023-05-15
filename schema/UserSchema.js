const mongoose = require("mongoose");

const UserSignupSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
},
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
});

module.exports = mongoose.model("User", UserSignupSchema);
