const mongoose = require("mongoose");
require("dotenv").config();

function MongoDB() {
  mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Successfully!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB");
    console.log(err);
    process.exit(1);
  });
}

module.exports =  {MongoDB} ;