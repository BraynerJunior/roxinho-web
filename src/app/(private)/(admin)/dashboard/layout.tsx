import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider
      className="min-h-screen"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={session.user}/>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
