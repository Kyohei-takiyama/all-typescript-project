import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt";

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("authJWT", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided!");
  }

  const verified = verifyToken(token);
  if (!verified) {
    return res.status(401).send("Access Denied: Invalid Token!");
  }
  console.log("verified: ", verified);

  req.userId = verified.userId;
  next();
};

export default authJWT;
