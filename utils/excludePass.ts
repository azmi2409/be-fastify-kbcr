import { User } from "@prisma/client";

export type sanitizedUser = Omit<User, "password">;

export default function excludePassword(user: User): sanitizedUser {
  const { password, ...rest } = user;
  return rest;
}
