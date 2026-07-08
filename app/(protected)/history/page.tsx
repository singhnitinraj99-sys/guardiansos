import { getEmergencyHistory } from "@/actions/history.actions";
import HistoryList from "@/components/history/HistoryList";

export default async function HistoryPage() {
  const history = await getEmergencyHistory();

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Emergency History
        </h1>

        <p className="text-muted-foreground mt-2">
          Review all SOS incidents, SMS delivery and call activity.
        </p>
      </div>

      <HistoryList history={history} />
    </main>
  );
}