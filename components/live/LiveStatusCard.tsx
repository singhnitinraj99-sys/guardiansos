"use client";

import { Activity, MapPin, Clock } from "lucide-react";

interface Props {
  status: string;
  points: number;
  updatedAt: Date;
}

export default function LiveStatusCard({ status, points, updatedAt }: Props) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-600" />
          </span>

          <div>
            <p className="mt-1 text-sm text-muted-foreground">
              Anyone with this link can follow the emergency in real time.
            </p>
            <p className="text-sm text-muted-foreground">{status}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          <div>
            <MapPin className="mb-1 h-5 w-5 text-red-600" />
            <p className="text-sm text-muted-foreground">Points</p>
            <p className="font-bold">{points}</p>
          </div>

          <div>
            <Clock className="mb-1 h-5 w-5 text-red-600" />
            <p className="text-sm text-muted-foreground">Updated</p>
            <p className="font-bold">
              {new Intl.DateTimeFormat("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(new Date(updatedAt))}
            </p>
          </div>

          <div>
            <Activity className="mb-1 h-5 w-5 text-red-600" />
            <p className="text-sm text-muted-foreground">Status</p>

            <p className="font-bold text-green-600">
              <p
                className={`font-bold ${
                  status === "PENDING"
                    ? "text-green-600"
                    : status === "SENT"
                      ? "text-blue-600"
                      : "text-red-600"
                }`}
              >
                {status}
              </p>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
