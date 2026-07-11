import { syncUser } from "@/actions/user.actions";
import DashboardShell from "@/components/layout/DashboardShell";
import SOSEngineServer from "@/components/sos/SOSEngineServer";
import { SOSProvider } from "@/components/sos/SOSProvider";
import { currentUser } from "@clerk/nextjs/server";
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser();
  const clerkUser = await currentUser();

  const admins =
    process.env.ADMIN_EMAILS?.split(",").map((email) =>
      email.trim().toLowerCase()
    ) ?? [];

  const email =
    clerkUser?.emailAddresses[0]?.emailAddress.toLowerCase();

  const isAdmin = email ? admins.includes(email) : false;
  return (
    <SOSProvider>
      <SOSEngineServer />
      <DashboardShell isAdmin={isAdmin}>
        {children}
      </DashboardShell>
    </SOSProvider>
  );
}