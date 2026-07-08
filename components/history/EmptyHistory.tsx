export default function EmptyHistory() {
  return (
    <div className="rounded-xl border p-12 text-center">
      <div className="text-6xl">🚨</div>

      <h2 className="mt-4 text-2xl font-semibold">
        No Emergency History
      </h2>

      <p className="mt-2 text-muted-foreground">
        Your emergency incidents will appear here after your first SOS.
      </p>
    </div>
  );
}