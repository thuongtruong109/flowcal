import mongoose from "mongoose";
import { E_COLLECTION } from "../enums";

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

const ColorModel = mongoose.model<IColorModel>(E_COLLECTION.COLOR, ColorSchema);

export default ColorModel;
