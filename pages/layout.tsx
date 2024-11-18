import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Head from "next/head";
import spa from "../src/components/remoteBasic/spatial_navigation";
import Script from "next/script";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(()=> {
    window.addEventListener('load', function() {
      console.log('loaded')
      //console.log('loaded', SpatialNavigation);
      // SpatialNavigation.init();
      // SpatialNavigation.add({ selector: '.focusable' });
      // SpatialNavigation.makeFocusable();
      // SpatialNavigation.focus();
    });
    console.log(window)
  }, [])
  return (
    <div className="h-[100vh] w-[100vw] bg-slate-800">
      <Head>
        <Script
          id="spatial-navigation-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      
    `,
          }}
        />
      </Head>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-5 w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
}
