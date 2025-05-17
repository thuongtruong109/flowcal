import mongoose from "mongoose";
import { ENTITY } from "../constants";

const statusSchema: mongoose.Schema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.USER,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  __v: { type: Number, select: false },
}).set("timestamps", true);

type IStatusModel = mongoose.InferSchemaType<typeof statusSchema> & Document;
const StatusModel = mongoose.model<IStatusModel>(ENTITY.STATUS, statusSchema);

export default StatusModel;
