// console.log("cookie: ", req.cookies["session-id"]);
// // セッションが存在するかを確認
// if (req.cookies["session-id"]) {
//   const sessionId = req.cookies["session-id"];
//   const sessionData = (await redisClient.get(sessionId)) as string | null;
//   if (sessionData) {
//     // セッションデータがあれば既存のセッションを更新
//     const sessionDataObj: SessionData = JSON.parse(sessionData);
//     sessionDataObj.lastAccess = new Date();
//     await redisClient.set(sessionId, JSON.stringify(sessionDataObj));
//     console.log("sessionId: ", sessionId, "sessionDataObj: ", sessionDataObj);
//     res.send({ user });
//     return;
//   }
// }

// // create session
// const sessionId = uuidv4();
// const sessionData: SessionData = {
//   userId: user.id,
//   userInfo: {
//     name: user.name,
//     email: user.email,
//   },
//   createdAt: new Date(),
//   lastAccess: new Date(),
// };

// Redisにセッションデータを格納 (EX: 有効期限。有効期限を過ぎると自動で削除される)
// // https://github.com/redis/ioredis?tab=readme-ov-file#expiration
// await redisClient.set(sessionId, JSON.stringify(sessionData), "EX", 60 * 60); // 1時間

// // セッションIDをクッキーに設定してレスポンス
// res.cookie("session-id", sessionId, {
//   httpOnly: true,
//   maxAge: 60 * 60 * 1000, // 1時間
// });
