import { Request, Response } from "express";
import { Note } from "../models/notes.model";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const note = await Note.create({
      userId,
      title,
      content,
    });
    return res.status(201).json({ note: note });
  } catch (error) {
    console.group(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
