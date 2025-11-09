"use server";

import { registerSchema, RegisterSchema } from "@/lib/validations/auth-schemas";
import { userRepository } from "@/repositories/users";
import { revalidateTag } from "next/cache";

export async function registerUser(data: RegisterSchema) {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos" };
  }

  const { email, password } = parsed.data;
  const result = await userRepository.create({ email, password });

  if (!result.success) {
    return { success: false, message: result.message };
  }

  revalidateTag("users");

  return {
    success: result.success,
    user: result.user,
  };
}
