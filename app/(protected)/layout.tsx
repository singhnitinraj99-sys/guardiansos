import DashboardShell from "@/components/layout/DashboardShell";
import SOSEngineServer from "@/components/sos/SOSEngineServer";
import { SOSProvider } from "@/components/sos/SOSProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SOSProvider>
      <SOSEngineServer />
      <DashboardShell>
        {children}
      </DashboardShell>
    </SOSProvider>
  );
}