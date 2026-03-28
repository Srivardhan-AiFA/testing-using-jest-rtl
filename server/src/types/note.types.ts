import mongoose from "mongoose";

export type NoteType = {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  category: string;
  isFavorite: boolean;
};
