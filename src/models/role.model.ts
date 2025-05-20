import mongoose from "mongoose";
import { ENTITY } from "../constants";

const roleSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  __v: { type: Number, select: false },
});

type IRoleModel = mongoose.InferSchemaType<typeof roleSchema> & Document;
const RoleModel = mongoose.model<IRoleModel>(ENTITY.ROLE, roleSchema);

export default RoleModel;
