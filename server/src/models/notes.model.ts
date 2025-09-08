import mongoose from "mongoose";
import { Note } from "../types/note.types";

const noteSchema = new mongoose.Schema<Note>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<Note>("Note", noteSchema);
