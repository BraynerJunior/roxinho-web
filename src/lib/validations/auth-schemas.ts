import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string(),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(50, "Senha muito longa"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;