import { ReactNode } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { role } = useParams<{ role: string }>();

  if (!role) {
    return <div>Role not specified</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role={role} />
      <div className="flex flex-col flex-1 ml-0 md:ml-64">
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-6 border-b bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {role} Dashboard
          </h2>
          <div className="text-sm text-slate-500">Welcome back!</div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
