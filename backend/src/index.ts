import dotenv from "dotenv";
import session from "express-session";
import RedisStore from "connect-redis";
import express, { Request, Response } from "express";
import { Redis } from "ioredis";

import { getAllUser, User } from "./infra/User";

const app = express();
const port = 80;
dotenv.config();

// Redisクライアントの設定
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
});

// Redisに接続できたかを確認
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// セッションミドルウェアの設定
app.use(
  session({
    name: "session-id",
    store: new RedisStore({ client: redisClient }),
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.get("/api/v1/users", async (req: Request, res: Response) => {
  const getSession = await redisClient.get("foo");
  console.log("getSession: " + getSession);
  if (!getSession) {
    redisClient.set("foo", "bar");
    console.log("setSession: bar");
  }
  const users: User[] = (await getAllUser()) || [];
  res.send("users: " + JSON.stringify(users));
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!!!!!!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
