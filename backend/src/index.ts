import dotenv from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

// import sessionMiddleware from "./middlewares/session";

import usersRouter from "./routes/user";
import authRouter from "./routes/auth";

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

// health check
app.get("/health", (req: Request, res: Response) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
