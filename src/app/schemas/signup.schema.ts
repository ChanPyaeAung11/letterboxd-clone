import { z } from "zod";

export const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  username: z.string().trim(),
  passwordHash: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});
