import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  role: "user" | "admin" | "moderator";
}

export const generateToken = ({ id, role }: { id: string; role: string }) => {
  const SECRET = process.env.JWT_SECRET;
  const token = jwt.sign({ id, role }, SECRET as string, {
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
