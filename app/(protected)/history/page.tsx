import { getEmergencyHistory } from "@/actions/history.actions";
import HistoryList from "@/components/history/HistoryList";
import PageHeader from "@/components/shared/PageHeader";

export default async function HistoryPage() {
  const history = await getEmergencyHistory();

  return (
    <main className="mx-auto max-w-6xl p-6">
        <PageHeader
        title="Emergency History"
        description="Review all SOS incidents, SMS delivery and call activity."
      />
      

      <HistoryList history={history} />
    </main>
  );
}