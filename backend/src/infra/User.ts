import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface User {
  name: string;
  email: string;
}

export async function getAllUser(): Promise<User[] | undefined> {
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
