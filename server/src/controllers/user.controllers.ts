import { Response } from "express";
import { AuthRequest } from "../types/user.type";
import { Note } from "../models/notes.model";
import { User } from "../models/users.model";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "content is required" });
    }

    // get user email, username
    const user = await User.findOne({ _id: req.id });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user with this email not found" });
    }

    // 2. Create the note
    const note = await Note.create({
      content: content.trim(),
      name: user.username,
      email: user.email,
      role: req.role,
      userId: req.id,
    });

    // 3. Return success
    return res.status(201).send({
      id: note._id,
      name: note.name,
      content: note.content,
      email: note.email,
      userId: note.userId,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
