import mongoose from "mongoose";
import { ENTITY } from "../constants";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    max: 10,
  },
  __v: { type: Number, select: false },
});

type ICategoryModel = mongoose.InferSchemaType<typeof categorySchema> & Document;
const CategoryModel = mongoose.model<ICategoryModel>(
  ENTITY.CATEGORY,
  categorySchema
);

export default CategoryModel;
