import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { Clock, Home } from "lucide-react";
import { useRouter } from "next/router";

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
    const {pathname} = useRouter()
    return (
      <Sidebar variant='inset'>
        <SidebarContent className="bg-slate-900 rouded-r-lg">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                console.log(pathname, item.url, pathname === item.url)
                return(
                <SidebarMenuItem key={item.title} className="mt-2">
                  <SidebarMenuButton asChild>
                    <a href={item.url} className={cn("text-white text-lg py-6", pathname === item.url && 'bg-gray-400 text-black')}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }
  