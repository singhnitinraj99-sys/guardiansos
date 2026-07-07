import { syncUser } from "@/actions/user.actions";
import DashboardShell from "@/components/layout/DashboardShell";
import SOSEngineServer from "@/components/sos/SOSEngineServer";
import { SOSProvider } from "@/components/sos/SOSProvider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser;
  return (
    <SOSProvider>
      <SOSEngineServer />
      <DashboardShell>
        {children}
      </DashboardShell>
    </SOSProvider>
  );
}