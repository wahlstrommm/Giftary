const mongoose = require("mongoose");
const { Schema, model, models } = require("mongoose");

const companyModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Lägg till ett namn"],
    trim: true,
    // unique: true,
    maxlength: [50, "Namn kan inte var större än 50 bokstäver"],
  },
  orgNumber: {
    type: String,
    required: true,
    unique: true,
  },
  products: {
    type: Array,
  },
  password: {
    type: String,
    required: [true, "Lägg till ett lösenord"],
    trim: true,
  },
  companyName: {
    type: String,
    // unique: true,
  },
});
module.exports = mongoose.model("Company", companyModel);
