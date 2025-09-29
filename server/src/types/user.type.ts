import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type Role = {
  role: "user" | "admin" | "moderator";
};

export interface UserType extends Role {
  id: string;
  username: string;
  email: string;
}

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
