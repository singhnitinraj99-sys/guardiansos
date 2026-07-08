import { getEmergencyDetails } from "@/actions/history-details.actions";

import SummaryCard from "@/components/history/details/SummaryCard";
import LocationCard from "@/components/history/details/LocationCard";
import SMSCard from "@/components/history/details/SMSCard";
import CallTimeline from "@/components/history/details/CallTimeline";

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
      <div>
        <h1 className="text-3xl font-bold">
          🚨 Emergency Incident
        </h1>

        <p className="text-muted-foreground mt-2">
          {new Date(
            incident.createdAt
          ).toLocaleString()}
        </p>
      </div>

      <SummaryCard incident={incident} />

      <LocationCard incident={incident} />

      <SMSCard incident={incident} />

      <CallTimeline calls={incident.calls} />
    </main>
  );
}