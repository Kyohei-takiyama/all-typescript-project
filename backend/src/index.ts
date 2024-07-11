import dotenv from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

import usersRouter from "./routes/user";
import authRouter from "./routes/auth";
import todoRouter from "./routes/todo";

const app = express();
const port = 80;
dotenv.config();

// Swaggerの設定
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ミドルウェアの設定
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
// app.use(sessionMiddleware);

// ルートの設定
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", todoRouter);

// health check
app.get("/health", (req: Request, res: Response) => {
  console.log("health check");
  res.send("ok");
});

app
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
  .on("error", (e) => {
    console.error(e);
  });
