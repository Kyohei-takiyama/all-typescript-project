import "express-session";
import { Router, Request, Response } from "express";
// import { redisClient } from "../middlewares/redisClient";
// import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";

import { ResponseUser, getUserByEmail } from "../infra/User";
import { generateToken } from "../util/jwt";

const router = Router();

export interface SessionData {
  userId: string;
  // authToken: string;
  userInfo: {
    name: string;
    email: string;
  };
  createdAt: Date;
  lastAccess: Date;
}

export interface ResponseLoginedUser {
  user: ResponseUser;
  token: string;
}

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // get user from db
  const user = await getUserByEmail(email);
  console.log("user: ", user);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  // compare password
  const isPasswordMatch = bcryptjs.compareSync(password, user.password);
  if (!isPasswordMatch) {
    res.status(401).send("Password is incorrect");
    return;
  }

  // generate token
  const token = generateToken(user.id);

  const loginedUser: ResponseLoginedUser = {
    user,
    token,
  };

  res.send({ user: loginedUser });
});

export default router;
