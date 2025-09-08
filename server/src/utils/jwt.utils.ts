import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const SECRET = process.env.JWT_SECRET;
  const token = jwt.sign(userId, SECRET as string);
  return token;
};

export const compareToken = (token: string) => {
  try {
    const SECRET = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, SECRET as string);
    return decoded;
  } catch (error) {
    return null;
  }
};
