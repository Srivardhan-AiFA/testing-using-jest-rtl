import { Request, Response, NextFunction } from "express";
import { compareToken } from "../utils/jwt.utils";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string | JwtPayload;
}

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

    req.userId = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
