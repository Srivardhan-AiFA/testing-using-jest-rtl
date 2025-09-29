import jwt from "jsonwebtoken";
import { Role } from "../types/user.type";

export interface JwtPayload {
  id: string;
  role: Role;
}

export const generateToken = ({
  id,
  username,
  role,
}: {
  id: string;
  username: string;
  role: string;
}) => {
  const SECRET = process.env.JWT_SECRET;
  const token = jwt.sign({ id, username, role }, SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};

export const compareToken = (token: string): JwtPayload | null => {
  try {
    const SECRET = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, SECRET as string) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
