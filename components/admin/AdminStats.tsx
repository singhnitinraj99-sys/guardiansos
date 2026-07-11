import {
  Users,
  Phone,
  ShieldAlert,
  Activity,
  MapPinned,
  PhoneCall,
  Siren,
  TrendingUp,
} from "lucide-react";

import StatCard from "./StatCard";

interface Props {
  stats: {
    totalUsers: number;
    totalContacts: number;
    totalSOS: number;
    activeSOS: number;
    totalCalls: number;
    totalLiveLocations: number;
    sosToday: number;
    callsToday: number;
  };
}

export default function AdminStats({
  stats,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Users"
        value={stats.totalUsers}
        icon={<Users className="h-7 w-7" />}
      />

      <StatCard
        title="Contacts"
        value={stats.totalContacts}
        icon={<Phone className="h-7 w-7" />}
      />

      <StatCard
        title="SOS Logs"
        value={stats.totalSOS}
        icon={<ShieldAlert className="h-7 w-7" />}
      />

      <StatCard
        title="Active SOS"
        value={stats.activeSOS}
        icon={<Activity className="h-7 w-7" />}
        color="text-red-500"
      />

      <StatCard
        title="Calls"
        value={stats.totalCalls}
        icon={<PhoneCall className="h-7 w-7" />}
        color="text-green-600"
      />

      <StatCard
        title="Live Locations"
        value={stats.totalLiveLocations}
        icon={<MapPinned className="h-7 w-7" />}
        color="text-blue-600"
      />

      <StatCard
        title="SOS Today"
        value={stats.sosToday}
        icon={<Siren className="h-7 w-7" />}
        color="text-orange-600"
      />

      <StatCard
        title="Calls Today"
        value={stats.callsToday}
        icon={<TrendingUp className="h-7 w-7" />}
        color="text-violet-600"
      />
    </div>
  );
}