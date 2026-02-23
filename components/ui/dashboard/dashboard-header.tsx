"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

const formatTitle = (slug?: string) => {
  if (!slug) return "Dashboard";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const DashboardHeader = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  
  const segments = pathname.split("/").filter(Boolean);
  const current = segments[1] || "dashboard";

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-2 md:px-6 w-full">
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
            <span className="text-xs text-muted-foreground ">
              Manage your CRM
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
        </button>

        {/* User Avatar */}
        <div className="flex gap-2 bg-slate-200  pl-1 pr-5 py-1 rounded-full items-center">
          <Avatar className="h-9 w-9 ">
            <AvatarFallback>
              {session.user?.name?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col leading-tight">
            <p className="text-sm capitalize font-semibold">
              {session.user?.name}
            </p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
