interface Props {
  incident: any;
}

export default function SMSCard({
  incident,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        📱 SMS Summary
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">
            Delivery Status
          </p>

          <p className="font-medium">
            {incident.status}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Message
          </p>

          <div className="mt-2 rounded-lg bg-gray-50 p-4">
            <pre className="whitespace-pre-wrap text-sm">
              {incident.message ?? "No message saved"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}