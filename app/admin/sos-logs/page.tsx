import { getSOSLogs } from "@/actions/admin-sos.actions";

import PageHeader from "@/components/shared/PageHeader";

import SOSLogsTable from "@/components/admin/SOSLogsTable";

export default async function AdminSOSLogsPage() {
  const logs = await getSOSLogs();

  return (
    <div className="space-y-6">
      <PageHeader
        title="SOS Logs"
        description="All emergency incidents"
      />

      <SOSLogsTable logs={logs} />
    </div>
  );
}