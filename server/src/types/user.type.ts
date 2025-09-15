import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type UserType = {
  username: string;
  email: string;
  refreshToken: string;
};

export interface AuthRequest extends Request {
  email?: string | JwtPayload;
}

export type email = string | JwtPayload | undefined;
