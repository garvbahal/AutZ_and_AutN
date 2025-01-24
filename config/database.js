const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB Connection Successful");
    })
    .catch((error) => {
      console.log("DB connection not successful");
      console.log(error);
      process.exit(1);
    });
};
