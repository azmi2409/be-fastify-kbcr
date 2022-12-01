import { PrismaClient, User } from "@prisma/client";
import { LoginType } from "../types/auth.type";

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
