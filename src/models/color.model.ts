import mongoose from "mongoose";
import { ENTITY } from "../constants";

const colorSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    max: 8,
  },
  __v: { type: Number, select: false },
});

type IColorModel = mongoose.InferSchemaType<typeof colorSchema> & Document;
const ColorModel = mongoose.model<IColorModel>(ENTITY.COLOR, colorSchema);

export default ColorModel;
