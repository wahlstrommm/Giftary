import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const CompanyModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Lägg till ett namn"],
    trim: true,
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
});
const Company = models.Company || model("Company", CompanyModel);
export default Company;
