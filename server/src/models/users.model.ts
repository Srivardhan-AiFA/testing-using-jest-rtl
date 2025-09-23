import mongoose from "mongoose";
import { UserType } from "../types/user.type";

const userSchema = new mongoose.Schema<UserType>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserType>(
  "users/rbac/email-pass",
  userSchema
);
