import DashboardHeader from "@/components/ui/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/ui/dashboard/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <DashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
