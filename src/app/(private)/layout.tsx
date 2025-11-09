import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { UserMenu } from "@/components/UserMenu";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  if (session.user?.role === "not_allowed") redirect("/not-allowed");

  return (
    <SidebarLayout>
      {children} <UserMenu user={session.user} />
    </SidebarLayout>
  );
}
