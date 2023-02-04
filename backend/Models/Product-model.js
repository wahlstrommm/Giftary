const mongoose = require("mongoose");
const { Schema, model, models } = require("mongoose");

const productModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Lägg till ett namn"],
    trim: true,
    maxlength: [50, "Namn kan inte var större än 50 bokstäver"],
  },
  summary: {
    type: String,
    required: [true, "Lägg till ett namn"],
    trim: true,
    maxlength: [100, "Beskrivningen kan inte var längre än 100 bokstäver"],
  },
  age: {
    type: String,
    required: [true],
  },
  aimedFor: {
    type: String,
    required: [true],
  },
  price: {
    type: String,
    required: [true],
  },
  image: {
    type: [String],
    // data: Buffer,
    // contentType: String,
  },
  favorited: {
    type: Boolean,
  },
  category: {
    type: String,
    required: [true],
  },
  companyName: {
    type: String,
    required: [true],
  },
  overAge: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Product", productModel);
