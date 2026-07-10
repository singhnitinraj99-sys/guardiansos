"use client";

import { useEffect, useState } from "react";

import { getLiveTracking } from "@/actions/live-tracking.actions";
import LiveStatusCard from "./LiveStatusCard";
import RouteMap from "@/components/history/details/RouteMap";
import RouteStats from "@/components/history/details/RouteStats";
import RouteTimeline from "@/components/history/details/RouteTimeline";

import { calculateRouteStats } from "@/lib/calculateRouteStats";

interface LiveLocation {
  id: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
  createdAt: Date;
}

interface Incident {
  id: string;
  status: string;
  createdAt: Date;
  locations: LiveLocation[];
}
interface Props {
  incident: Incident;
}

export default function LiveTracker({
  incident,
}: Props) {
  const [data, setData] = useState<Props["incident"]>(incident);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const latest = await getLiveTracking(data.id);

        setData(latest);
        if (
  latest.status === "SENT" ||
  latest.status === "FAILED" ||
  latest.status === "OFFLINE"
) {
  clearInterval(interval);
}
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [data.id]);

  const stats = calculateRouteStats(data.locations);

  return (
    <div className="space-y-8">

        <LiveStatusCard
    status={data.status}
    points={data.locations.length}
    updatedAt={
  data.locations.length > 0
    ? data.locations[data.locations.length - 1].createdAt
    : data.createdAt
}
/>

      <RouteStats stats={stats} />

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-bold">
          Live Map
        </h2>

        <RouteMap
          points={data.locations}
        />
      </section>

      <RouteTimeline
        locations={data.locations}
      />
    </div>
  );
}