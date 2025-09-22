import { Response } from "express";
import { Note } from "../models/notes.model";
import { AuthRequest } from "../types/user.type";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.userId;
    const note = await Note.create({
      userId,
      title,
      content,
      category,
    });
    return res.status(201).send(note);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const category = req.params.category || "all";

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const query: any = { userId };
    if (category !== "all") query.category = category;

    // total notes count (for pagination metadata)
    const total = await Note.countDocuments(query);

    // actual notes for this page
    const notes = await Note.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      notes,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findOne({ _id: id, userId: userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).send(note);
  } catch (error) {
    console.error("Get note error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const { title, content, category } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId },
      { title, content, category },
      { new: true }
    );
    if (!updatedNote)
      return res.status(401).json({ message: "Note not found" });
    return res.status(200).json({ message: "note updated", updatedNote });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deletedNote = await Note.findOneAndDelete(
      {
        _id: id,
        userId: userId,
      },
      { new: true }
    );

    if (!deletedNote)
      return res.status(401).json({ message: "Note not found" });

    return res.status(200).json({ message: "note deleted", deletedNote });
  } catch (error) {}
};
