import mongoose from "mongoose";
import { UserType } from "../types/user.type";

const userSchema = new mongoose.Schema<UserType>(
  {
    id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserType>("users/rbac/oauth", userSchema);
