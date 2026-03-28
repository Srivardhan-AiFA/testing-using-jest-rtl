import { Request, Response, NextFunction } from "express";
import { compareToken } from "../utils/jwt.utils";
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types/user.type";

export const protectedRoute = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = compareToken(token);

    if (!decoded) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    if (typeof decoded === "object" && "userId" in decoded) {
      req.userId = (decoded as JwtPayload & { userId: string }).userId;
      next();
    } else {
      res.status(401).json({ message: "Invalid token payload" });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
