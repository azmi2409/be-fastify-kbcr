import { PrismaClient, User } from "@prisma/client";
import { LoginType } from "../types/auth.type";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Login Function
 */

export async function loginUser(data: LoginType) {
  return await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
}

export async function changePassword(data: LoginType) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.update({
    where: {
      email: data.email,
    },
    data: {
      password: hashedPassword,
    },
  });
}
