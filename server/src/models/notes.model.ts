import mongoose from "mongoose";
import { NoteType } from "../types/note.types";

const noteSchema = new mongoose.Schema<NoteType>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    // category: { type: String, required: true },
    // isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Note = mongoose.model<NoteType>("Note", noteSchema);
