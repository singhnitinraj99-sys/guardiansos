import { UserButton } from "@clerk/nextjs";

import AdminMobileSidebar from "./AdminMobileSidebar";
import Logo from "../shared/Logo";
export default function AdminNavbar() {
  return (
    <header className="flex h-auto items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <AdminMobileSidebar />

        <div>
          <h1 className="text-lg font-semibold">
           <Logo />
          </h1>

          <p className="hidden text-sm text-muted-foreground sm:block">
            Manage users and emergency incidents
          </p>
        </div>
      </div>

      <UserButton />
    </header>
  );
}