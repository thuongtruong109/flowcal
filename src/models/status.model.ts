import mongoose from "mongoose";
import { ENTITY } from "../constants";

const statusSchema: mongoose.Schema = new mongoose.Schema({
  creatorIdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.USER,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
}).set("timestamps", true);

type IStatusModel = mongoose.InferSchemaType<typeof statusSchema> & Document;
const StatusModel = mongoose.model<IStatusModel>(ENTITY.STATUS, statusSchema);

export default StatusModel;
