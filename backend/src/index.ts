import dotenv from "dotenv";
import express, { Request, Response } from "express";

import sessionMiddleware from "./middlewares/session";

import usersRouter from "./routes/user";

const app = express();
const port = 80;
dotenv.config();

// ミドルウェアの設定
app.use(sessionMiddleware);

// ルートの設定
app.use("/api/v1/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!!!!!!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
