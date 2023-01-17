const mongoose = require("mongoose");
const { Schema, model, models } = require("mongoose");
const categoryModel = mongoose.Schema({
  forHim: {
    type: Boolean | any,
  },
  forHer: {
    type: Boolean | any,
  },
  forBoth: {
    type: Boolean | any,
  },
  clothes: {
    type: Boolean | any,
  },
});
module.exports = mongoose.model("Category", categoryModel);
