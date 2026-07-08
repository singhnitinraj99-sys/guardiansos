import Link from "next/link";
import StatusBadge from "./StatusBadge";

interface Props {
  incident: any;
}

export default function HistoryCard({
  incident,
}: Props) {
  const totalCalls = incident.calls.length;

  const completedCalls = incident.calls.filter(
    (call: any) => call.status === "COMPLETED"
  ).length;

  const failedCalls = totalCalls - completedCalls;

  const hasLocation =
    incident.latitude !== null &&
    incident.longitude !== null;

  const lastCall =
    incident.calls[incident.calls.length - 1];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            🚨 Emergency Incident
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {new Date(
              incident.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <StatusBadge status={incident.status} />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">
            Location
          </p>

          <p className="font-medium">
            {hasLocation
              ? "📍 Available"
              : "Unavailable"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Calls
          </p>

          <p className="font-medium">
            {totalCalls}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Successful Calls
          </p>

          <p className="font-medium text-green-600">
            {completedCalls}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Failed Calls
          </p>

          <p className="font-medium text-red-600">
            {failedCalls}
          </p>
        </div>
      </div>

      {lastCall && (
        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Last Call
          </p>

          <p className="font-medium">
            {lastCall.contactName}
          </p>

          <p className="text-sm">
            {lastCall.status}
          </p>
        </div>
      )}

      <div className="mt-6">
        <Link
          href={`/history/${incident.id}`}
          className="font-semibold text-blue-600 hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}