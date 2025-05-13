import { ENTITY } from "../constants";
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.USER,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    default: "public",
  },
  description: {
    type: String,
    default: "",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ENTITY.USER,
      default: [],
    },
  ],
  isFavorite: {
    type: Boolean,
    default: false,
  },
  background: {
    type: String,
    default: "#ffffff",
  },
  customBackground: {
    type: String,
    default: "",
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: Date.now(),
  },
}).set("timestamps", true);

type IProjectModel = mongoose.InferSchemaType<typeof projectSchema> & Document;
const ProjectModel = mongoose.model<IProjectModel>(
  ENTITY.PROJECT,
  projectSchema
);

export default ProjectModel;
