interface Props {
  incident: any;
}

export default function SummaryCard({
  incident,
}: Props) {
  const totalCalls = incident.calls.length;

  const completed = incident.calls.filter(
    (c: any) => c.status === "COMPLETED"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border p-5">
        <p className="text-sm text-gray-500">
          Status
        </p>

        <h2 className="text-xl font-bold">
          {incident.status}
        </h2>
      </div>

      <div className="rounded-xl border p-5">
        <p className="text-sm text-gray-500">
          Calls
        </p>

        <h2 className="text-xl font-bold">
          {totalCalls}
        </h2>
      </div>

      <div className="rounded-xl border p-5">
        <p className="text-sm text-gray-500">
          Successful
        </p>

        <h2 className="text-xl font-bold text-green-600">
          {completed}
        </h2>
      </div>

      <div className="rounded-xl border p-5">
        <p className="text-sm text-gray-500">
          Failed
        </p>

        <h2 className="text-xl font-bold text-red-600">
          {totalCalls - completed}
        </h2>
      </div>
    </div>
  );
}