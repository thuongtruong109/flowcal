import mongoose from "mongoose";
import { ENTITY } from "../constants";

interface IColorModel extends mongoose.Document {
  name: string;
}

const ColorSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    max: 8,
  },
});

const ColorModel = mongoose.model<IColorModel>(ENTITY.COLOR, ColorSchema);

export default ColorModel;
