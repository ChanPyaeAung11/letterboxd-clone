"use server";

import { revalidatePath } from "next/cache";
import { schema } from "../schemas/signup.schema";
import { ltdRepo } from "@/repositories/ltd.repo";

type ServerActionResult = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createUser(
  state: any,
  formData: FormData
): Promise<ServerActionResult> {
  // parsing formData and creating an obj out of it
  const userData = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    passwordHash: formData.get("password") as string,
  };
  // validation of the obj above against zod schema
  const result = schema.safeParse(userData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: "Invalid Input from the user: ",
    };
  }
  const memberCreated = await ltdRepo.createMember({
    ...result.data,
    memberType: "Free",
  });
  console.log(memberCreated);
  if (memberCreated.success) {
    revalidatePath("/", "layout");
  }
  return {
    success: memberCreated.success,
    message: memberCreated.message,
  };
}
