// src/routes/users.ts
import { Router, Request, Response } from "express";
import redisClient from "../middlewares/redisClient";
import { getAllUser, User } from "../infra/User";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const getSession = await redisClient.get("foo");
  console.log("getSession: " + getSession);
  if (!getSession) {
    redisClient.set("foo", "bar");
    console.log("setSession: bar");
  }
  const users: User[] = (await getAllUser()) || [];
  res.send("users: " + JSON.stringify(users));
});

export default router;
