const mongoose = require("mongoose");
const { Schema, model, models } = require("mongoose");
const categoryModel = mongoose.Schema({
  forHim: {},
  forHer: {},
  forBoth: {},
  clothes: {},
});
module.exports = mongoose.model("Category", categoryModel);
