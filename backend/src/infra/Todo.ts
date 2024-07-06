import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Status = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface Todo {
  id: string;
  title: string;
  status: Status;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  details?: string;
}

export interface RequestTodo
  extends Omit<Todo, "id" | "createdAt" | "updatedAt"> {}

export interface ResponseTodo extends Omit<Todo, "userId"> {}

export async function createTodo(
  newTodo: RequestTodo
): Promise<ResponseTodo | undefined> {
  try {
    const todo = await prisma.todo.create({
      data: newTodo,
    });
    console.log(todo);
    if (todo === null || todo === undefined) {
      return undefined;
    }
    return {
      id: todo.id,
      title: todo.title,
      status: todo.status,
      details: todo.details,
    } as ResponseTodo;
  } catch (e) {
    console.error("createTodo error: ", e);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllTodo(): Promise<ResponseTodo[] | undefined> {
  try {
    const allTodo = await prisma.todo.findMany();
    console.log(allTodo);
    if (allTodo === null || allTodo === undefined) {
      return undefined;
    }
    const responseTodo = allTodo.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        status: todo.status,
        details: todo.details,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      };
    }) as ResponseTodo[];
    return responseTodo;
  } catch (e) {
    console.error("getAllTodo error: ", e);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getTodoById(
  id: string
): Promise<ResponseTodo | undefined> {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    console.log(todo);
    if (todo === null || todo === undefined) {
      return undefined;
    }
    return {
      id: todo.id,
      title: todo.title,
      status: todo.status,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      details: todo.details,
    } as ResponseTodo;
  } catch (e) {
    console.error("getTodoById error: ", e);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 *
 * @param id
 * @param updatedTodo
 * @returns {Promise<ResponseTodo | undefined>
 * @description Bodyに含まれる更新情報でTodoを更新する（Stautsのみの場合、Statusのみ更新する挙動）
 */
export async function updateTodo(
  id: string,
  updatedTodo: Partial<RequestTodo>
): Promise<ResponseTodo | undefined> {
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: updatedTodo,
    });
    console.log(todo);
    if (todo === null || todo === undefined) {
      return undefined;
    }
    return {
      id: todo.id,
      title: todo.title,
      status: todo.status,
      details: todo.details,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    } as ResponseTodo;
  } catch (e) {
    console.error("updateTodo error: ", e);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteTodo(todoId: string): Promise<void> {
  try {
    await prisma.todo.delete({
      where: { id: todoId },
    });
  } catch (e) {
    console.error("deleteTodo error: ", e);
  } finally {
    await prisma.$disconnect();
  }
}
