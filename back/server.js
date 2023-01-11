console.log("hej");

const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("server är igång på port 3000");
});

app.get("/", function (req, res) {
  res.send("<h1></h1>Hello world från Express test</h1>");
});
