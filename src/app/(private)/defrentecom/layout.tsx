import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SidebarProvider >
    <div className="flex min-h-screen w-full bg-violet-eggplant-900">
        <AppSidebar />

        <main className="flex-1 bg-violet-eggplant-900">
          <SidebarTrigger className="ml-5 sm:hidden"/>
          {children}
        </main>
    </div>
      </SidebarProvider>
  );
}
