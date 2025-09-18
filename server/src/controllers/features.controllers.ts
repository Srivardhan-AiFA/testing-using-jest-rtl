import { Response } from "express";
import { AuthRequest } from "../types/user.type";
import { User } from "../models/users.model";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select("username -_id");
    return res.status(200).send(users);
  } catch (error) {}
};
