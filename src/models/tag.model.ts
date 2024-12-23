import { E_COLLECTION } from "../enums";
import mongoose from "mongoose";

interface ITagModel extends mongoose.Document {
  name: string;
  color: mongoose.Schema.Types.ObjectId;
}

const tagSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: E_COLLECTION.COLOR,
    required: true,
  },
});

const TagModel = mongoose.model<ITagModel>(E_COLLECTION.TAG, tagSchema);

export default TagModel;
