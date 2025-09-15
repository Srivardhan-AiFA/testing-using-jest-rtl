import { Request, Response } from "express";

export const sendUserProfile = (req: Request, res: Response) => {
  const token = (req.user as any).token;
  res.redirect(`http://localhost:5173/dashboard?token=${token}`);
};
