"use server";

import { findUserById } from "@/lib/user/queries";

export async function findUserByIdAction(
  id: number
): Promise<
  | { id: number; name: string; avatarUrl?: string | null; role?: string | null }
  | null
> {
  const user = await findUserById(id);
  if (!user) {
    return null;
  }

  return {
    id: user.id!,
    name: user.name ?? "Sem nome",
    avatarUrl: user.avatarUrl ?? null,
    role: user.role ?? null,
  };
}
