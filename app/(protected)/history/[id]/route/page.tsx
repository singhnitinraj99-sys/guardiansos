import PageHeader from "@/components/shared/PageHeader";
import { getEmergencyDetails } from "@/actions/history-details.actions";
import RouteMap from "@/components/history/details/RouteMap";
import RouteStats from "@/components/history/details/RouteStats";
import RouteTimeline from "@/components/history/details/RouteTimeline";
import { calculateRouteStats } from "@/lib/calculateRouteStats";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function RoutePage({
  params,
}: Props) {
  const { id } = await params;

  const incident = await getEmergencyDetails(id);

  const stats = calculateRouteStats(
  incident.locations
);

  return (
    <main className="mx-auto max-w-7xl p-6">
        <PageHeader
  title="Emergency Route"
  description="Review every movement recorded during this SOS incident."
/>

<RouteStats stats={stats} />

<section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
  <div className="mb-5">
    <h2 className="text-2xl font-bold">
      Live Route
    </h2>

    <p className="text-muted-foreground">
      Recorded GPS movement during the emergency.
    </p>
  </div>

  <RouteMap
    points={incident.locations}
  />
</section>

<div className="mt-8">
  <RouteTimeline
     locations={incident.locations.map((location) => ({
    ...location,
    createdAt: new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(location.createdAt)),
  }))}
  />
</div>
       </main>
  );
}