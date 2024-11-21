import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { init } from "@noriginmedia/norigin-spatial-navigation";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

const BACK = [27, 461];
export default function Layout({ children, ...props }) {
  const { back } = useRouter();
  useEffect(() => {
    init({});
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const handleKeyDown = useCallback((keyboardEvent: KeyboardEvent) => {
    if (BACK.includes(keyboardEvent.keyCode)) {
      back();
    }
  }, []);
  if(props.noLayout) {
    return <>{children}</>
  }
  return (
    <div className="w-full bg-slate-800">
      <SidebarProvider>
        <div className="!w-[14%]">
          <AppSidebar />
        </div>
        <main className="!w-[86%] p-5 w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
}
