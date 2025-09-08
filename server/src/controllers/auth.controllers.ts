import { Request, Response } from "express";
import { User } from "../models/users.model";
import { generateToken } from "../utils/jwt.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: await hashedPassword,
    });

    const token = generateToken(user._id.toString());

    return res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: password,
        hashedPassword: hashedPassword,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id.toString());
    return res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        isPasswordValid: isPasswordValid,
      },
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
