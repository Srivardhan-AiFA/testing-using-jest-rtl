import jwt from "jsonwebtoken";

export const generateToken = (email: string) => {
  const SECRET = process.env.JWT_SECRET;
  const token = jwt.sign({ email }, SECRET as string, {
    expiresIn: "1h",
  });
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
