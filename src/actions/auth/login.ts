"use server";

import { signIn } from "@/lib/auth";
import { LoginSchema, loginSchema } from "@/lib/validations/auth-schemas";
import { AuthError } from "@auth/core/errors";

export async function loginAction(data: LoginSchema) {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: { general: ["Dados de formulário inválidos."] } };
  }

  const { email, password } = parsed.data as LoginSchema;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: { general: ["Credenciais inválidas"] } };
        default:
          return { error: { general: ["Algo deu errado."] } };
      }
    }

    if ((error as Error).message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Erro não tratado no loginAction:", error);
    return { error: { general: ["Credenciais inválidas"] } };
  }
}
