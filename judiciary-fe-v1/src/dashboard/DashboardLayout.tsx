import { ReactNode } from 'react';
import { Outlet, useParams } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
interface DashboardLayoutProps {
  children?: ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { role } = useParams<{ role: string }>();
  if (!role) {
    return <div>Role not specified</div>;
  }
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role={role} />
      <main className="flex-1 ml-0 md:ml-64 bg-gray-50 p-6">
        <Outlet />
      {children}
      </main>
    </div>
  );
};


export default DashboardLayout;

