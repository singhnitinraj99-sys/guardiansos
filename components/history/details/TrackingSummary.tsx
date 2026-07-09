"use client";

import Link from "next/link";
import { Navigation, Clock, MapPinned, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  incidentId: string;
  points: number;
  startedAt: Date;
  lastUpdated?: Date;
}

export default function TrackingSummary({
  incidentId,
  points,
  startedAt,
  lastUpdated,
}: Props) {
  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date));

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Navigation className="h-6 w-6 text-red-600" />

        <div>
          <h2 className="text-xl font-bold">
            Live Tracking
          </h2>

          <p className="text-sm text-muted-foreground">
            Route recorded during this emergency
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-muted/40 p-4">
          <MapPinned className="mb-2 h-5 w-5 text-red-600" />

          <p className="text-sm text-muted-foreground">
            GPS Points
          </p>

          <p className="text-2xl font-bold">
            {points}
          </p>
        </div>

        <div className="rounded-xl bg-muted/40 p-4">
          <Clock className="mb-2 h-5 w-5 text-red-600" />

          <p className="text-sm text-muted-foreground">
            Started
          </p>

          <p className="font-semibold">
            {formatTime(startedAt)}
          </p>
        </div>

        <div className="rounded-xl bg-muted/40 p-4">
          <Route className="mb-2 h-5 w-5 text-red-600" />

          <p className="text-sm text-muted-foreground">
            Last Update
          </p>

          <p className="font-semibold">
            {lastUpdated ? formatTime(lastUpdated) : "--"}
          </p>
        </div>
      </div>

      <Button asChild className="mt-8 w-full">
        <Link href={`/history/${incidentId}/route`}>
          View Full Route
        </Link>
      </Button>
    </section>
  );
}