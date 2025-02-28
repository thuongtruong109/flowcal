import mongoose from "mongoose";
import { ENTITY } from "../constants";

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
  ENTITY.CATEGORY,
  CategorySchema
);

export default CategoryModel;
