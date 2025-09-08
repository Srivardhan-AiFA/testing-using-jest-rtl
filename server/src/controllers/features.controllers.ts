import { Response } from "express";
import { AuthRequest } from "../types/user.type";
import { addToFavorite } from "../services/addToFavorite.service";
import { addToCategory } from "../services/addToCategory.service";

export const addToFavoritesControllers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;

    const isAdded = await addToFavorite(noteId, userId);
    if (!isAdded)
      return res.status(400).json({ message: "unable to add to favorites" });
    return res.status(200).json({ message: "added to favorites" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addToCategoryController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;
    const category = req.query.category as string;

    const isUpdatedCategory = await addToCategory(noteId, userId, category);
    if (!isUpdatedCategory)
      return res.status(400).json({ message: "unable to update category" });
    return res.status(200).json({ message: "updated the category" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
