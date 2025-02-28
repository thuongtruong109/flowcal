import mongoose from "mongoose";
import { ENTITY } from "../constants";

interface ICardModel extends mongoose.Document {
  boardId: string;
  type: string;
  status: number;
  loading: boolean;
  icon: string;
  text: string;
  tagId: string;
}

const cardSchema: mongoose.Schema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.BOARD,
    required: true,
  },
  type: {
    type: String,
    default: "draggable",
  },
  status: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    required: true,
  },
  tagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.TAG,
    required: false,
    default: "639ee0c235daa8e2541b1cf8",
  },
}).set("timestamps", true);

const CardModel = mongoose.model<ICardModel>(ENTITY.CARD, cardSchema);

export default CardModel;
