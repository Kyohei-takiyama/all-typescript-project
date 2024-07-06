import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

interface TokenPayload extends JwtPayload {
  userId: string;
}

export const generateToken = (userId: string): string =>
  jwt.sign({ userId }, secret, { expiresIn: "1h" });

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    return decoded;
  } catch (e) {
    console.error("verifyToken error: ", e);
    return null;
  }
};
