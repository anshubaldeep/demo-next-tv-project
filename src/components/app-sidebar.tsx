import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { Clock, Home } from "lucide-react";
import AppSidebarMenutItem from "./app-sidebar-menu-item";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Watchlist",
    url: "/watchlist",
    icon: Clock,
  },
];

export function AppSidebar() {
  const { ref, focusKey } = useFocusable();
  return (
    <FocusContext.Provider value={focusKey}>
      <Sidebar variant="sidebar" ref={ref} className="border-none">
        <SidebarContent className="bg-slate-900 rouded-r-lg">
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => (
                  <AppSidebarMenutItem item={item} index={index} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </FocusContext.Provider>
  );
}
