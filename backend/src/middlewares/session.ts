import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "./redisClient";
import dotenv from "dotenv";

dotenv.config();

const sessionMiddleware = session({
  name: "session-id",
  store: new RedisStore({ client: redisClient }),
  secret: process.env.REDIS_SEACRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  },
});

export default sessionMiddleware;
