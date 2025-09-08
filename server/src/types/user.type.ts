import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type UserType = {
  username: string;
  email: string;
  password: string;
};

export interface AuthRequest extends Request {
  userId?: string | JwtPayload;
}

export type userId = string | JwtPayload | undefined;
