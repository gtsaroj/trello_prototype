import bcrypt from "bcryptjs";

export const decryptPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
