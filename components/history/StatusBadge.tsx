interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {
  const colors = {
    SENT: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    OFFLINE: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status as keyof typeof colors] ??
        "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
}