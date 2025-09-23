import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/user.type";

export const requireRole = (roles: string | string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    if (!req.role || !allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};
