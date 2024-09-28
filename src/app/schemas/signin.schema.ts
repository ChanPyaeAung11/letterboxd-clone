import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string(),
  password: z.string().min(1, "Password field must not be empty."),
});
