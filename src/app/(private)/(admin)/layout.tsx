import { getSessionOrThrow } from "@/lib/auth/session";
import React from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  let user;
  try {
    user = await getSessionOrThrow();
  } catch {
    return <div>Você precisa estar logado</div>;
  }

  if (user?.role !== "admin") {
    return <div>Acesso restrito a administradores.</div>;
  }

  return <>{children}</>;
}
