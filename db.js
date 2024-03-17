const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true

    })
    .then(() => {
      console.log("Connection Successfull with Database");
    })
    .catch((error) => {
      console.log("Sorry! Connection Failed!");
      console.error(error);
     
    });
};