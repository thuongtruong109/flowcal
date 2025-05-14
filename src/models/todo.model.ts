import mongoose from "mongoose";
import { ENTITY } from "../constants";

const todoSchema: mongoose.Schema = new mongoose.Schema({
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
  __v: { type: Number, select: false },
}).set("timestamps", true);

type ITodoModel = mongoose.InferSchemaType<typeof todoSchema> & Document;
const TodoModel = mongoose.model<ITodoModel>(ENTITY.TODO, todoSchema);

export default TodoModel;
