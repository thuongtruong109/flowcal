import mongoose from "mongoose";
import { ENTITY } from "../constants";

const cardSchema: mongoose.Schema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.PROJECT,
    required: true,
  },
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.STATUS,
    required: true,
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
  },
  __v: { type: Number, select: false },
}).set("timestamps", true);

type ICardModel = mongoose.InferSchemaType<typeof cardSchema> & Document;
const CardModel = mongoose.model<ICardModel>(ENTITY.CARD, cardSchema);

export default CardModel;
