const mongoose = require("mongoose");
const nanoid = require("nanoid");

const URLSchema = new mongoose.Schema({
    urlId: {
        type: String,
        default: nanoid(),
      },
      origUrl: {
        type: String,
        required: true,
      },
      shortUrl: {
        type: String,
        required: true,
      },
      clicks: {
        type: Number,
        required: true,
        default: 0,
      },
      date: {
        type: String,
        default: Date.now,
      },
      User: [{
      type: String,
      ref: "User",
    }],
});

module.exports = mongoose.model("URL", URLSchema);
