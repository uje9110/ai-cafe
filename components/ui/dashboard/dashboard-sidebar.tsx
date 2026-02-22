"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Users, Megaphone, MessageCircle, Box, Home, Notebook } from "lucide-react";
import clsx from "clsx";

const menuItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Purchase",
    href: "/dashboard/purchase",
    icon: Notebook,
  },
  {
    title: "Customer",
    href: "/dashboard/customer",
    icon: Users,
  },
  {
    title: "Product",
    href: "/dashboard/product",
    icon: Box,
  },
  {
    title: "Promo",
    href: "/dashboard/promo",
    icon: Megaphone,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageCircle,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight">i-caffe</h1>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup className="px-3">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon size={18} />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-6 py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} i-caffe
      </SidebarFooter>
    </Sidebar>
  );
}
