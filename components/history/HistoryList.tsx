
import EmptyHistory from "./EmptyHistory";
import HistoryCard from "./HistoryCard";

interface Props {
  history: any[];
}

export default function HistoryList({
  history,
}: Props) {
  if (history.length === 0) {
    return <EmptyHistory />;
  }

  return (
    
    <div className="grid gap-6">
    
      {history.map((incident) => (
        <HistoryCard
          key={incident.id}
          incident={incident}
        />
      ))}
    </div>
  );
}