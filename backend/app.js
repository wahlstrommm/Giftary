var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const registerRouter = require("./routes/register");
const productRoute = require("./routes/product-route");
const loginRouter = require("./routes/login");
const productOrganizer = require("./routes/productOrganizer");
const productList = require("./routes/productList");
var app = express();
const PORT = 3001;
const mongoose = require("mongoose");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: true }));

dotenv.config();
app.use("/", indexRouter);
app.use("/api/user", usersRouter);
app.use("/api/products", productRoute);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/overview", productOrganizer);
app.use("/api", productList);
const uri = process.env.MONGODB_URI;

async function init() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(uri, options);
    console.log("connected to database");
  } catch (error) {
    console.log("error", error);
  }
  app.listen(PORT, () => console.log("lyssnar på port", 3000));
}
init();
module.exports = app;
