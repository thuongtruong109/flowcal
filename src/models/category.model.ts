import mongoose from "mongoose";
import { E_COLLECTION } from "../enums";

interface IColorModel extends mongoose.Document {
  name: string;
}

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    max: 10,
  },
});

const CategoryModel = mongoose.model<IColorModel>(
  E_COLLECTION.CATEGORY,
  CategorySchema
);

export default CategoryModel;
