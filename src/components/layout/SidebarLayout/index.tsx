"use client"; // 1. Marca este componente como um Client Component

import { AppSidebar } from "@/components/layout/AppSidebar";
import { CustomTrigger } from "@/components/layout/AppSidebar/trigger";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();

  const isHome = currentPath === "/home";

  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full">
        <div className="absolute inset-0">{children}</div>
        {!isHome && (
          <div className="flex flex-row gap-2 items-center justify-center">
            <AppSidebar />
            <div className="z-10">
              <CustomTrigger/>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}
