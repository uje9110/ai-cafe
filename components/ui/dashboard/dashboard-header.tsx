"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Sparkles, Tag, Bell } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const formatTitle = (slug?: string) => {
  if (!slug) return "Dashboard";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const DashboardHeader = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const current = segments[1] || "dashboard";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6 w-full">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-primary/10 text-primary">
            <SidebarTrigger>
              <LayoutDashboard className="h-5 w-5" />
            </SidebarTrigger>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight">
              {formatTitle(current)}
            </span>
            <span className="text-xs text-muted-foreground">
              Manage and monitor your CRM
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
        </div>

        {/* User Avatar */}
        <Avatar className="h-9 w-9">
          <AvatarFallback>IA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
