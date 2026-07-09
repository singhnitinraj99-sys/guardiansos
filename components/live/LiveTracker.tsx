"use client";

import { useEffect, useState } from "react";

import { getLiveTracking } from "@/actions/live-tracking.actions";

import LiveStatusCard from "./LiveStatusCard";
import RouteMap from "@/components/history/details/RouteMap";
import RouteStats from "@/components/history/details/RouteStats";
import RouteTimeline from "@/components/history/details/RouteTimeline";

import { calculateRouteStats } from "@/lib/calculateRouteStats";

interface Props {
  incident: Awaited<
    ReturnType<
      typeof import("@/actions/public-live.actions").getPublicLiveTracking
    >
  >;
}

export default function LiveTracker({
  incident,
}: Props) {
  const [data, setData] = useState(incident);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const latest = await getLiveTracking(data.id);

        // Update only the fields that actually change
        setData((prev) => ({
          ...prev,
          status: latest.status,
          locations: latest.locations,
        }));

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

  const lastUpdated =
    data.locations.length > 0
      ? data.locations[data.locations.length - 1].createdAt
      : data.createdAt;

  return (
    <div className="space-y-8">
      <LiveStatusCard
        status={data.status}
        points={data.locations.length}
        updatedAt={lastUpdated}
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