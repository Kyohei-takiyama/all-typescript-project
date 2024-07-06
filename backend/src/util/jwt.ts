import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const generateToken = (userId: string): string =>
  jwt.sign({ userId }, secret, { expiresIn: "1h" });

export const verifyToken = (token: string) => jwt.verify(token, secret);
