import mongoose from "mongoose";
import { ENTITY } from "../constants";

interface IUserModel extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  isVerify: boolean;
  avatar: string;
  salt: string;
  roles: string[];
  projects: string[];
  events: string[];
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      max: 21,
      min: 8,
    },
    avatar: String,
    salt: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ENTITY.ROLE,
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ENTITY.PROJECT,
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ENTITY.EVENT,
      },
    ],
  },
  { toJSON: { virtuals: true } }
  // { timestamps: true }
).set("timestamps", true);

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

const UserModel = mongoose.model<IUserModel>(ENTITY.USER, UserSchema);

export default UserModel;
