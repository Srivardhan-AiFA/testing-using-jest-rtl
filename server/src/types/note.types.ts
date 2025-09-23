import mongoose from "mongoose";

export type NoteType = {
  userId: mongoose.Types.ObjectId;
  content: string;
  role: string;
  name: string;
  email: string;
};
