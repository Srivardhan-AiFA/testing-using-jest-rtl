import { Request, Response } from "express";

export const sendUserProfile = (req: Request, res: Response) => {
  const token = (req.user as any).token;
  res.cookie("token", token, { maxAge: 9000, httpOnly: true });
  res.redirect(`http://localhost:5173/dashboard?token=${token}`);
};
