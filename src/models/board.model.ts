import mongoose from "mongoose";
import { CATEGORY, ENTITY } from "../constants";

const boardSchema: mongoose.Schema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.PROJECT,
    required: true,
  },
  category: {
    type: String,
    enum: CATEGORY,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  background: {
    type: String,
    default: "",
  },
  customBackground: {
    type: String,
    default: "",
  },
  __v: { type: Number, select: false },
}).set("timestamps", true);

// boardSchema.index({ projectId: 1, name: 1 }, { unique: true });
// boardSchema.index({ projectId: 1, isFavorite: 1 }, { unique: true });
// boardSchema.index({ projectId: 1, cards: 1 }, { unique: true });

type IBoardModel = mongoose.InferSchemaType<typeof boardSchema> & Document;
const BoardModel = mongoose.model<IBoardModel>(ENTITY.BOARD, boardSchema);

export default BoardModel;
