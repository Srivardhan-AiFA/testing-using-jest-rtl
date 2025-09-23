import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type UserType = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin" | "moderator";
};

export interface AuthRequest extends Request {
  id?: string;
  role?: string;
}

export type userId = string | JwtPayload | undefined;

declare global {
  namespace Express {
    interface Request {
      id?: string;
      role?: string;
    }
  }
}
