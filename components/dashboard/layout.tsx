import { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";

import DashboardShell from "@/components/layout/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((email) =>
      email.trim().toLowerCase()
    ) ?? [];

  const isAdmin = user
    ? adminEmails.includes(
        user.emailAddresses[0]?.emailAddress.toLowerCase()
      )
    : false;

  return (
    <DashboardShell isAdmin={isAdmin}>
      {children}
    </DashboardShell>
  );
}