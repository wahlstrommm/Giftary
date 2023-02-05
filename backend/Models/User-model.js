const mongoose = require("mongoose");
const { Schema, model, models } = require("mongoose");

const userModel = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, "Namn kan inte var större än 50 bokstäver"],
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, "Namn kan inte var större än 50 bokstäver"],
  },
  sex: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Var snäll och skriv en riktig mail!",
    ],
    unique: true,
  },
  password: {
    type: String,
  },
  productList: {
    type: Array,
  },
});
module.exports = mongoose.model("user", userModel);
