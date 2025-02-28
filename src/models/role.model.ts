import mongoose from "mongoose";
import { ENTITY } from "../constants";

interface IRoleModel extends mongoose.Document {
  name: string;
}

const roleSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const RoleModel = mongoose.model<IRoleModel>(ENTITY.ROLE, roleSchema);

export default RoleModel;
