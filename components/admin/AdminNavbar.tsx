import { UserButton } from "@clerk/nextjs";

export default function AdminNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-lg font-semibold">
          GuardianSOS Admin
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage users and emergency incidents
        </p>
      </div>

      <UserButton />
    </header>
  );
}