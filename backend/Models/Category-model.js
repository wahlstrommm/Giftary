import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const categoryModel = new mongoose.Schema({
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
const Category = models.Category || model("Category", categoryModel);
export default Category;
