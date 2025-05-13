import mongoose from "mongoose";
import { ENTITY, ROLE } from "../constants";

const userSchema: mongoose.Schema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      max: 21,
      min: 8,
    },
    salt: String,
    roles: [
      {
      type: String,
      enum: ROLE,
      required: true,
      default: "user"
    }],
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { toJSON: { virtuals: true } }
  // { timestamps: true }
).set("timestamps", true);

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

// userSchema.index({ username: 1 }, { unique: true });

type IUserModel = mongoose.InferSchemaType<typeof userSchema> & Document;
const UserModel = mongoose.model<IUserModel>(ENTITY.USER, userSchema);

export default UserModel;
