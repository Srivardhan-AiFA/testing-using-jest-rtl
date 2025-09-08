import mongoose from "mongoose";

export type Note = {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  category: string;
  isFavorite: boolean;
};
