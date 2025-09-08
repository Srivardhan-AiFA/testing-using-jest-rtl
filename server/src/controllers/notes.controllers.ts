import { Response } from "express";
import { Note } from "../models/notes.model";
import { AuthRequest } from "../types/user.type";

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

export const getNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ _id: id, userId: req.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ note });
  } catch (error) {
    console.error("Get note error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
