import mongoose from "mongoose";
import { UserType } from "../types/user.type";

const userSchema = new mongoose.Schema<UserType>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserType>("User", userSchema);
