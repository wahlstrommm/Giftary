const mongoose = require("mongoose");
const { Schema, model, models } = require("mongoose");

const productModel = new mongoose.Schema({
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
    maxlength: [70, "Beskrivningen kan inte var längre än 70 bokstäver"],
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
    type: any,
    required: [true],
  },
  favorited: {
    type: boolean,
  },
  category: {
    type: string,
    required: [true],
  },
});
module.exports = mongoose.model("Product", productModel);
