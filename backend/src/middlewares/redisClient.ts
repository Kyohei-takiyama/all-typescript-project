import { Redis } from "ioredis";
import dotenv from "dotenv";

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

export default redisClient;
