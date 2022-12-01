import { User } from "@prisma/client";

export type sanitizedUser = Omit<User, "password">;

export default function excludePassword(user: User): sanitizedUser | null {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}
