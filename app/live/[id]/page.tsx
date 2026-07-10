
import { getLiveTracking } from "@/actions/live-tracking.actions";
import LiveTracker from "@/components/live/LiveTracker";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function LivePage({
  params,
}: Props) {
  const { id } = await params;

  const incident = await getLiveTracking(id);

  return (
    <main className="mx-auto max-w-7xl p-6">
      <LiveTracker incident={incident} />
    </main>
  );
}