"use server";

import { signIn } from "next-auth/react";
import { LoginSchema, loginSchema } from "@/lib/validations/auth-schemas";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginSchema) {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data as LoginSchema;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: false,
    });
  } catch {
    return { error: { general: ["Credenciais inválidas"] } };
  }

  redirect("/");
}
