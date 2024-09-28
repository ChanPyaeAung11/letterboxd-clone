"use server";
import { SignInSchema as schema } from "../schemas/signin.schema";
import { ltdRepo } from "@/repositories/ltd.repo";

type ServerActionResult = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function SignInAction(
  prevState: any,
  formData: FormData
): Promise<ServerActionResult> {
  const userData = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };
  const result = schema.safeParse(userData);
  console.log(result.error?.flatten().fieldErrors);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: "Invalid Input from the user",
    };
  }
  const signInCheck = await ltdRepo.checkMember(
    result.data.username,
    result.data.password
  );
  if (signInCheck === false) {
    return {
      success: false,
      message: "Wrong crendentials",
    };
  } else if (signInCheck === null) {
    return {
      success: false,
      message: "User does not exist",
    };
  } else {
    return {
      success: true,
      message: "You are logged in",
    };
  }
}
