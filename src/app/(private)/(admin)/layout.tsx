import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();
 
  if (!session) {
    redirect("/login");
  }

  if (session && session.user?.role !== "admin") {
    redirect("/home");
  }

  return <>{children}</>;
}
