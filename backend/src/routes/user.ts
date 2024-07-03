// src/routes/users.ts
import { Router, Request, Response } from "express";
// import redisClient from "../middlewares/redisClient";
import {
  createUser,
  getAllUser,
  RequestUser,
  ResponseUser,
} from "../infra/User";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const user: RequestUser = req.body;
    if (!user?.name || !user?.email || !user?.password) {
      res.status(400).send("name or email or password is empty");
      return;
    }
    const newUser = await createUser(user);
    if (!newUser) {
      res.status(500).send("Failed to create user");
      return;
    }
    res.send(newUser);
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to create user");
  }
});

router.get("/", async (req: Request, res: Response) => {
  // const getSession = await redisClient.get("foo");
  // console.log("getSession: " + getSession);
  // if (!getSession) {
  //   redisClient.set("foo", "bar");
  //   console.log("setSession: bar");
  // }
  const users: ResponseUser[] = (await getAllUser()) || [];
  res.send("users: " + JSON.stringify(users));
});

export default router;
