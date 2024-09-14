import crypto from "node:crypto";

export const hashPassword = async (
  password: string
): Promise<{ hash: string; salt: string }> => {
  let salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { hash, salt };
};

export const comparePassword = async (
  password: string,
  hashed: string,
  salt: string
): Promise<boolean> => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === hashed;
};