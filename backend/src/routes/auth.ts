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

  // console.log("cookie: ", req.cookies["session-id"]);
  // // セッションが存在するかを確認
  // if (req.cookies["session-id"]) {
  //   const sessionId = req.cookies["session-id"];
  //   const sessionData = (await redisClient.get(sessionId)) as string | null;
  //   if (sessionData) {
  //     // セッションデータがあれば既存のセッションを更新
  //     const sessionDataObj: SessionData = JSON.parse(sessionData);
  //     sessionDataObj.lastAccess = new Date();
  //     await redisClient.set(sessionId, JSON.stringify(sessionDataObj));
  //     console.log("sessionId: ", sessionId, "sessionDataObj: ", sessionDataObj);
  //     res.send({ user });
  //     return;
  //   }
  // }

  // // create session
  // const sessionId = uuidv4();
  // const sessionData: SessionData = {
  //   userId: user.id,
  //   userInfo: {
  //     name: user.name,
  //     email: user.email,
  //   },
  //   createdAt: new Date(),
  //   lastAccess: new Date(),
  // };

  // Redisにセッションデータを格納 (EX: 有効期限。有効期限を過ぎると自動で削除される)
  // // https://github.com/redis/ioredis?tab=readme-ov-file#expiration
  // await redisClient.set(sessionId, JSON.stringify(sessionData), "EX", 60 * 60); // 1時間

  // // セッションIDをクッキーに設定してレスポンス
  // res.cookie("session-id", sessionId, {
  //   httpOnly: true,
  //   maxAge: 60 * 60 * 1000, // 1時間
  // });

  res.send({ user: loginedUser });
});

export default router;
