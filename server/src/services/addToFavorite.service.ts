import { Note } from "../models/notes.model";
import { userId } from "../types/user.type";

export const addToFavorite = async (
  noteId: string,
  userId: userId
): Promise<true | null> => {
  try {
    const note = await Note.findOne({ _id: noteId, userId: userId });
    if (!note) return null;

    note.isFavorite = !note.isFavorite;
    await note.save();

    return true;
  } catch (error) {
    return null;
  }
};
