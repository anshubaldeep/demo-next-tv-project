import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { init } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";


export default function Layout({ children }) {
  useEffect(()=> {
    init({})
  }, []);
  return (
    <div className="w-full bg-slate-800">
      <SidebarProvider>
        <div className="!w-[14%]">
        <AppSidebar />
        </div>
        <main className="!w-[86%] p-5 w-full">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
