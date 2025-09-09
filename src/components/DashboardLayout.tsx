import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "ADMIN_MASTER" | "CLINIC_ADMIN" | "RECEPTIONIST" | "VETERINARIAN";
  userName: string;
  clinicName?: string;
}

export const DashboardLayout = ({ children, userRole, userName, clinicName }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole={userRole} userName={userName} clinicName={clinicName} />
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};