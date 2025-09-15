import mongoose from "mongoose";
import { UserType } from "../types/user.type";

const userSchema = new mongoose.Schema<UserType>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    refreshToken: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserType>("Users", userSchema);
