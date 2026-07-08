
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import DashboardCard from "@/components/dashboard/DashboardCard";

import { Users, ShieldAlert, Settings } from "lucide-react";

import { getDashboardData } from "@/actions/dashboard.actions";
import { syncUser } from "@/actions/user.actions";
import ShakeListener from "@/components/sos/ShakeListener";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InstallPWA from "@/components/pwa/InstallPWA";

export default async function DashboardPage() {
  await syncUser();
  const user = await getDashboardData();

  return (
    <div className="space-y-8">
      <WelcomeCard />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
       
        <Card>
    <CardHeader>
        <CardTitle>
            Install App
        </CardTitle>
    </CardHeader>

    <CardContent>

        <InstallPWA />

    </CardContent>
</Card>

        <DashboardCard
          title="Emergency Contacts"
          value={`${user?.contacts.length ?? 0}/5`}
          description="Saved Contacts"
          icon={Users}
        />

        <DashboardCard
          title="Last SOS"
          value={user?.logs.length ? "Available" : "Never"}
          description="Latest Emergency"
          icon={ShieldAlert}
        />

        <DashboardCard
          title="Countdown"
          value={`${user?.settings?.countdown ?? 5}s`}
          description="Current Setting"
          icon={Settings}
        />

        <ShakeListener threshold={12} />

       

      </div>
    </div>
  );
}
