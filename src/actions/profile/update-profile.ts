// src/actions/profile/update-profile.ts
"use server";

import { auth } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { updateUserProfile } from "@/lib/profile/queries";
import { profileSchema, ProfileSchema } from "@/lib/validations/profile-schema";
import type { UpdateProfileInput } from "@/repositories/profile/profile-repository";

export async function updateProfile(data: ProfileSchema) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Usuário não autenticado" };
  }

  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Dados inválidos" };
  }

  try {
    const userId = Number(session.user.id);
    const payload: UpdateProfileInput = {
      name: parsed.data.name ?? null,
      bio: parsed.data.bio ?? null,
      avatarUrl: parsed.data.avatarUrl ?? null,
    };
    const profile = await updateUserProfile(userId, payload);
    revalidateTag(`profile-${userId}`);
    revalidateTag("users");

    return {
      success: true,
      message: "Perfil atualizado com sucesso!",
      profile,
    };
  } catch (error) {
    console.error("❌ Erro ao atualizar perfil:", error);
    return {
      success: false,
      message: "Erro ao atualizar perfil",
    };
  }
}
