import { Request, Response, NextFunction } from "express";
import { verify } from "../utils/jwt.utils";

export interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (
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
    const decoded = verify(token) as { id: string };

    if (!decoded?.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
