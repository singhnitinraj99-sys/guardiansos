export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 rounded bg-gray-200" />

        <div className="h-36 rounded-xl bg-gray-200" />

        <div className="h-36 rounded-xl bg-gray-200" />

        <div className="h-36 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}