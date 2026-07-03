"use client";

import { CheckCircle2 } from "lucide-react";

interface Props {
  title: string;
  status: string;
}

export default function EmergencyStatusCard({
  title,
  status,
}: Props) {
  return (
    <div className="rounded-xl border bg-card/80 p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">
          {title}
        </span>

        <span className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-green-500" />

          {status}
        </span>
      </div>
    </div>
  );
}