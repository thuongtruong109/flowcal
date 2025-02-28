import mongoose from "mongoose";
import { ENTITY } from "../constants";

interface IBoardModel extends mongoose.Document {
  projectId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  isFavorite: boolean;
  background: mongoose.Schema.Types.ObjectId;
  customBackground: string;
  cards: mongoose.Schema.Types.ObjectId[];
}

const boardSchema: mongoose.Schema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.PROJECT,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.COLOR,
    required: true,
  },
  customBackground: {
    type: String,
    default: "",
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ENTITY.CARD,
    },
  ],
}).set("timestamps", true);

const BoardModel = mongoose.model<IBoardModel>(ENTITY.BOARD, boardSchema);

export default BoardModel;
