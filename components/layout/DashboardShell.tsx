import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardShellProps {
  children: ReactNode;
  isAdmin: boolean;
}

export default function DashboardShell({
  children,
  isAdmin,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin={isAdmin} />

      <div className="flex flex-1 flex-col">
        <Navbar isAdmin={isAdmin}/>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}