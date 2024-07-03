// import { Request, Response } from "express";
// import redisClient from "./redisClient";
// import dotenv from "dotenv";
// import { NextFunction } from "express";
// // import { SessionData } from "../routes/auth";
// import "express-session";

// declare module "express-session" {
//   interface SessionData {
//     userId: string;
//     userInfo: {
//       name: string;
//       email: string;
//     };
//     createdAt: Date;
//     lastAccess: Date;
//   }
// }

// dotenv.config();

// const sessionMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const sessionId = req.cookies["session-id"];

//   if (!sessionId) {
//     return res.status(401).send("Unauthorized");
//   }

//   const sessionDataStr = await redisClient.get(sessionId);

//   if (!sessionDataStr) {
//     return res.status(401).send("Session expired");
//   }

//   const sessionData = JSON.parse(sessionDataStr);
//   console.log("sessionMiddleware sessionData: ", sessionData);

//   // セッションデータをリクエストオブジェクトに添付
//   req.session = sessionData;

//   // セッションの最終アクセス時間を更新
//   sessionData.lastAccess = new Date();
//   await redisClient.set(
//     sessionId,
//     JSON.stringify(sessionData),
//     "EX",
//     60 * 60 * 24
//   );

//   next();
// };

// export default sessionMiddleware;
