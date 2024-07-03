import "express-session";
import { Router, Request, Response } from "express";
import { redisClient } from "../middlewares/redisClient";
import { v4 as uuidv4 } from "uuid";
import { getUserByEmail } from "../infra/User";

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

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // get user from db
  const user = await getUserByEmail(username);
  console.log("user: ", user);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  // compare password
  if (user.password !== password) {
    res.status(401).send("Password is incorrect");
    return;
  }

  console.log("cookie: ", req.cookies["session-id"]);
  // セッションが存在するかを確認
  if (req.cookies["session-id"]) {
    const sessionId = req.cookies["session-id"];
    // 既存のセッションを更新
    const sessionData = (await redisClient.get(sessionId)) as string | null;
    if (!sessionData) {
      res.status(401).send("Session expired");
      return;
    }
    const sessionDataObj: SessionData = JSON.parse(sessionData);
    sessionDataObj.lastAccess = new Date();
    await redisClient.set(sessionId, JSON.stringify(sessionDataObj));
    console.log("sessionId: ", sessionId, "sessionDataObj: ", sessionDataObj);
    // TODO：トークンを返却したい。JWTを使うか、セッションIDを返却するか
    res.send({ user });
    return;
  }

  // create session
  const sessionId = uuidv4();
  const sessionData: SessionData = {
    userId: user.id,
    userInfo: {
      name: user.name,
      email: user.email,
    },
    createdAt: new Date(),
    lastAccess: new Date(),
  };

  console.log("sessionId: ", sessionId);
  console.log("sessionData: ", sessionData);

  // Redisにセッションデータを格納 (EX: 有効期限。有効期限を過ぎると自動で削除される)
  // https://github.com/redis/ioredis?tab=readme-ov-file#expiration
  await redisClient.set(
    sessionId,
    JSON.stringify(sessionData),
    "EX",
    60 * 60 * 24
  ); // 24時間有効;

  // セッションIDをクッキーに設定してレスポンス
  res.cookie("session-id", sessionId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000, // 24時間
  });

  res.send({ user });
});

export default router;
