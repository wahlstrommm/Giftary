var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const productRoute = require("./routes/product-route");
var app = express();
const PORT = 3001;
const mongoose = require("mongoose");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const dotenv = require("dotenv");

dotenv.config();
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/products", productRoute);
const uri = process.env.MONGODB_URI;

async function init() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(uri, options);
    console.log("connected to database");
  } catch (error) {
    console.log("error", error);
  }
  app.listen(PORT, () => console.log("lyssnar på port", PORT));
}
init();
module.exports = app;
