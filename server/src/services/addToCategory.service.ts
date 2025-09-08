import { Note } from "../models/notes.model";
import { userId } from "../types/user.type";

export const addToCategory = async (
  noteId: string,
  userId: userId,
  category: string
): Promise<true | null> => {
  try {
    const note = await Note.findOne({ _id: noteId, userId: userId });
    if (!note) return null;

    note.category = category;
    await note.save();

    return true;
  } catch (error) {
    return null;
  }
};
