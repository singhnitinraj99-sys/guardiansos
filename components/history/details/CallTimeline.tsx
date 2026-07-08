interface Props {
  calls: any[];
}

export default function CallTimeline({
  calls,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-8 text-xl font-semibold">
        ☎ Call Timeline
      </h2>

      <div className="space-y-6">
        {calls.map((call, index) => (
          <div
            key={call.id}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-bold text-white">
                {index + 1}
              </div>

              {index < calls.length - 1 && (
                <div className="mt-2 h-14 w-px bg-gray-300" />
              )}
            </div>

            <div className="flex-1 rounded-xl border p-4">
              <h3 className="font-semibold">
                {call.contactName}
              </h3>

              <p className="text-sm text-gray-500">
                {call.phone}
              </p>

              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p>{call.status}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Attempt
                  </p>

                  <p>{call.attempt}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Duration
                  </p>

                  <p>
                    {call.duration ?? 0} sec
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                {new Date(
                  call.createdAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}