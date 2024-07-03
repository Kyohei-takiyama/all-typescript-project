import { Redis } from "ioredis";
import dotenv from "dotenv";
import session from "express-session";
import RedisStore from "connect-redis";

dotenv.config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
});

redisClient.on("connect", () => {
  console.log(
    `Connected to Redis server: ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  );
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// セッションミドルウェアの設定
const sessionMiddleware = session({
  name: "session-id",
  store: new RedisStore({ client: redisClient }),
  secret: process.env.REDIS_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  },
});

export { redisClient, sessionMiddleware };
