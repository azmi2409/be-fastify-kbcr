import bcrypt from "bcryptjs";

export const isPasswordMatch = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
