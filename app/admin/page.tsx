import { getAdminDashboardData } from "@/actions/admin.actions";

import PageHeader from "@/components/shared/PageHeader";

import AdminStats from "@/components/admin/AdminStats";
import RecentUsers from "@/components/admin/RecentUsers";
import RecentIncidents from "@/components/admin/RecentIncidents";

export default async function AdminPage() {
  const data = await getAdminDashboardData();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Manage GuardianSOS platform"
      />

      <AdminStats stats={data.stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentUsers
          users={data.recentUsers}
        />

        <RecentIncidents
          incidents={data.recentIncidents}
        />
      </div>
    </div>
  );
}