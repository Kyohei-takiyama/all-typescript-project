import { Router, Request, Response } from "express";

import {
  getAllTodo,
  createTodo,
  ResponseTodo,
  RequestTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../infra/Todo";
import authJWT from "../middlewares/jwt";

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

const router = Router();

router.use(authJWT);

// Todo の一覧を取得
router.get("/", async (req: Request, res: Response) => {
  const todos: ResponseTodo[] | undefined = await getAllTodo();
  res.send(todos);
});

// Todo をtodoIdで取得
router.get("/:id", async (req: Request, res: Response) => {
  const todo = await getTodoById(req.params.id);
  res.send(todo);
});

// Todo を作成
router.post("/", async (req: Request, res: Response) => {
  // userId は authJWT でセットされる
  const newTodo: RequestTodo = {
    title: req.body.title,
    status: req.body.status,
    userId: req.userId as string,
    details: req.body.details,
  };
  const todo = await createTodo(newTodo);
  res.send(todo);
});

router.put("/:id", async (req: Request, res: Response) => {
  const updatedTodo = await updateTodo(req.params.id, req.body);
  res.send(updatedTodo);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteTodo(req.params.id);
  res.send({ message: "Todo deleted" });
});

export default router;
