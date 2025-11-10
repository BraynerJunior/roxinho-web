// src/lib/validations/profile-schema.ts
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  bio: z.string().optional(),
  avatarUrl: z.string().nullable().optional(),
});
export type ProfileSchema = z.infer<typeof profileSchema>;
