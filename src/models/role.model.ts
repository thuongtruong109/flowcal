import { E_COLLECTION } from "../enums";
import mongoose from "mongoose";

interface IRoleModel extends mongoose.Document {
  name: string;
}

const roleSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const RoleModel = mongoose.model<IRoleModel>(E_COLLECTION.ROLE, roleSchema);

export default RoleModel;
