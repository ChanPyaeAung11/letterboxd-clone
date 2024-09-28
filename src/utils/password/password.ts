import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  inputPassword: string,
  hashedValue: string
) {
  return bcrypt.compare(inputPassword, hashedValue);
}
