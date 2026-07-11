import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

interface Props {
  children: ReactNode;
}

export default function AdminShell({
  children,
}: Props) {
  return (
   <div className="flex min-h-screen">
  <AdminSidebar />

  <div className="flex flex-1 flex-col">
    <AdminNavbar />

    <main className="flex-1 p-6">
      {children}
    </main>
  </div>
</div>
 );
}