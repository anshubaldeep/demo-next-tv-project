import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }) {
  return (
    <div className="h-[100vh] w-[100vw] bg-slate-800">
      <SidebarProvider>
        <AppSidebar />
        <main className="p-5 w-full">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
