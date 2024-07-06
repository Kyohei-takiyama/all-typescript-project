import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface RequestUser {
  name: string;
  email: string;
  password: string;
}

export interface ResponseUser {
  name: string;
  email: string;
}

export async function getAllUser(): Promise<ResponseUser[] | undefined> {
  try {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
    return allUsers;
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

export async function createUser(
  user: RequestUser
): Promise<ResponseUser | undefined> {
  try {
    const newUser = await prisma.user.create({
      data: user,
    });
    console.log(newUser);
    return newUser;
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log(user);
    if (!user) {
      return undefined;
    }
    return user;
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    console.log(user);
    if (!user) {
      return undefined;
    }
    return user;
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
