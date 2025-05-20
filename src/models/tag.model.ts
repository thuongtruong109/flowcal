import { ENTITY } from "../constants";
import mongoose from "mongoose";

const tagSchema: mongoose.Schema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.USER,
    required: true,
  },
  name: {
    type: String,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  __v: { type: Number, select: false },
});

type ITagModel = mongoose.InferSchemaType<typeof tagSchema> & Document;
const TagModel = mongoose.model<ITagModel>(ENTITY.TAG, tagSchema);

export default TagModel;
