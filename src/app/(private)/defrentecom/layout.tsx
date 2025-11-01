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
      <div className="relative flex min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 -z-10">{children}</div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <AppSidebar />
          <div>
            <CustomTrigger />
          </div>
        </div>
        <div className="flex-1">
        </div>
      </div>
    </SidebarProvider>
  );
}
