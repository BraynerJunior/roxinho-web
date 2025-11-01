import { AppSidebar } from "@/components/AppSidebar";
import { CustomTrigger } from "@/components/AppSidebar/trigger";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full">
        <div className="absolute inset-0">{children}</div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <AppSidebar />
          <div className="z-10">
            <CustomTrigger/>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
