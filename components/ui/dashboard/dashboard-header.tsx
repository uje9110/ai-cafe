"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/customer": "Customer",
  "/dashboard/promo": "Promo",
  "/dashboard/chat": "Chat",
};

const DashboardHeader = () => {
  const pathname = usePathname();
  const page = pathname.split("/");
  const title = page[2] || page[1];

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6 w-full">
      {/* Sidebar Toggle */}
      <SidebarTrigger />

      <Separator orientation="vertical" className="h-6" />

      {/* Current Page Title */}
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
    </header>
  );
};

export default DashboardHeader;
