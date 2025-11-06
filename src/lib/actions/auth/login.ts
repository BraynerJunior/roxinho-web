"use server";

import { signIn } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth-schemas";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch {
    return { error: { general: ["Credenciais inválidas"] } };
  }

  redirect("/dashboard");
}
