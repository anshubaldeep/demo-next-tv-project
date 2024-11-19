import React from "react";
import { SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { setFocus, useFocusable } from "@noriginmedia/norigin-spatial-navigation";

const AppSidebarMenutItem = ({ item, index }) => {
  const { pathname, push} = useRouter();
  const arrowPressInSidebar = (dir) => {
    if(dir === 'right' && pathname === '/'){
        setFocus('Card-0-0')
        return false;
    }
    return true;
  }
  const onPressMenuItem = () => {
    if(pathname !== item.url) {
      push(item.url);
    }
  }
  const { ref, focused, focusKey, ...props } = useFocusable({
    onArrowPress: arrowPressInSidebar,
    focusKey: `MenuItem-${index}`,
    onEnterPress: onPressMenuItem
  });

  return (
    <SidebarMenuItem key={item.title} className="mt-2" ref={ref}>
      <SidebarMenuButton asChild>
        <a
          href={item.url}
          className={cn(
            "text-white text-lg py-6",
            pathname === item.url && "bg-gray-400 text-black",
            focused && "bg-yellow-400 text-black"
          )}
        >
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default AppSidebarMenutItem;
