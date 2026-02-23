import DashboardHeader from "@/components/ui/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/ui/dashboard/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <DashboardHeader session={session}/>
        {children}
      </main>
    </SidebarProvider>
  );
}
