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

export const getAllNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const notes = await Note.find({ userId });

    return res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internale Server Error" });
  }
};
