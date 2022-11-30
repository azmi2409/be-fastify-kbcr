import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Register a new user
 */

export async function registerUser(data: User) {
  const user = await prisma.user.create({
    data,
  });
  return user;
}

/**
 * Get all users
 */

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}
