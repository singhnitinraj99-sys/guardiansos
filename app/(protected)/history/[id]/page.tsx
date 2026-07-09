import { getEmergencyDetails } from "@/actions/history-details.actions";

import SummaryCard from "@/components/history/details/SummaryCard";
import LocationCard from "@/components/history/details/LocationCard";
import SMSCard from "@/components/history/details/SMSCard";
import CallTimeline from "@/components/history/details/CallTimeline";
import PageHeader from "@/components/shared/PageHeader";
import TrackingSummary from "@/components/history/details/TrackingSummary";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function IncidentPage({
  params,
}: Props) {
  const { id } = await params;

  const incident = await getEmergencyDetails(id);

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <PageHeader
  title="Emergency Incident"
  description={new Date(incident.createdAt).toLocaleString()}
/>
          
          <CallTimeline calls={incident.calls} />

<section className="space-y-4">
  <h2 className="text-2xl font-bold">
    📍 Live Tracking Route
  </h2>

  {/* <RouteMap
    points={incident.locations}
  /> */}

  <TrackingSummary
  incidentId={incident.id}
  points={incident.locations.length}
  startedAt={incident.createdAt}
  lastUpdated={
    incident.locations.length
      ? incident.locations[
          incident.locations.length - 1
        ].createdAt
      : undefined
  }
/>
</section>
      <SummaryCard incident={incident} />

      <LocationCard incident={incident} />

      <SMSCard incident={incident} />

      <CallTimeline calls={incident.calls} />
    </main>
  );
}