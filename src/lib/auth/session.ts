// src/lib/auth/session.ts
import { getServerSession } from "next-auth/next";
import authOptions from "./index";
import type { Session } from "next-auth";

export async function getSessionOrThrow(): Promise<Session["user"]> {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Usuário não autenticado");
  return session.user;
}
