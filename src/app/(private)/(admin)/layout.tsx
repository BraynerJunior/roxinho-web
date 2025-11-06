import { auth } from "@/lib/auth";
import React from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
/*   const session = await auth();

  if (!session?.user) {
    return <div>Você precisa estar logado</div>;
  }

  if (session.user.role !== "admin") {
    return <div>Acesso restrito a administradores.</div>;
  } */

  return <>{children}</>;
}
