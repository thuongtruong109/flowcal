import mongoose from "mongoose";
import { ENTITY } from "../constants";

const noteSchema: mongoose.Schema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.PROJECT,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  tagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.TAG,
    required: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}).set("timestamps", true);

type INoteModel = mongoose.InferSchemaType<typeof noteSchema> & Document;
const NoteModel = mongoose.model<INoteModel>(ENTITY.NOTE, noteSchema);

export default NoteModel;
