import { Response } from "express";
import { AuthRequest } from "../types/user.type";
import { User } from "../models/users.model";

// Literal union type for roles
const ALLOWED_ROLES = ["user", "admin", "moderator"] as const;
type RoleType = "user" | "admin" | "moderator";

// Get all users with role "user"
export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select("email username role _id");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Internal server error while fetching users",
    });
  }
};

export const promoteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: "Email and role are required" });
    }

    const normalizedRole = String(role).toLowerCase();
    if (!ALLOWED_ROLES.includes(normalizedRole as RoleType)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const roleToSet = normalizedRole as RoleType;

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("_id email role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = roleToSet;
    await user.save();

    return res.status(200).json({
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
    });
  } catch (error) {
    console.error("Error promoting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
