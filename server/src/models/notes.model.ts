import mongoose from "mongoose";
import { NoteType } from "../types/note.types";

const noteSchema = new mongoose.Schema<NoteType>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users/rbac/oauth",
      required: true,
    },
    content: { type: String, required: true },
    role: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
  },
  { timestamps: true }
);

export const Note = mongoose.model<NoteType>("notes/rbac/oauth", noteSchema);
