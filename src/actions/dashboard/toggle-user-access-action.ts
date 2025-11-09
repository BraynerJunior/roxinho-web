"use server";

import { giveAccess, removeAccess } from "@/lib/user/queries";
import { revalidateTag } from "next/cache";

export async function toggleUserAccess(
  userId: number | null,
  currentRole: string
) {
  if (userId === null) throw new Error(`Operação inválida`);

  try {
    if (currentRole === "not_allowed") {
      await giveAccess(userId);
    } else {
      await removeAccess(userId);
    }

    revalidateTag("users");
    return { success: true };
  } catch (error) {
    console.error("Erro ao alterar acesso do usuário: ", error);
    return { success: false };
  }
}
