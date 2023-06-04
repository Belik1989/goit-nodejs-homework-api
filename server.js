const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Belik:Nm4bD7E-Bxd7Bmh@cluster0.tgfkk0s.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// Nm4bD7E-Bxd7Bmh Belik
