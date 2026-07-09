"use client";

import { MapPin, Flag } from "lucide-react";

interface LocationPoint {
  id: string;
  latitude: number;
  longitude: number;
  createdAt: Date | string;
}

interface Props {
  locations: LocationPoint[];
}

export default function RouteTimeline({ locations }: Props) {
  if (locations.length === 0) {
    return (
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Route Timeline</h2>

        <p className="text-muted-foreground">No tracking data available.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">Route Timeline</h2>

      <div className="space-y-5">
        {locations.map((location, index) => {
          const isFirst = index === 0;
          const isLast = index === locations.length - 1;

          return (
            <div key={location.id} className="flex items-start  gap-4">
              <div className="mt-1">
                {isFirst ? (
                  <Flag className="h-5 w-5 text-green-600" />
                ) : isLast ? (
                  <MapPin className="h-5 w-5 text-red-600" />
                ) : (
                  <MapPin className="h-5 w-5 text-blue-600" />
                )}
              </div>

              <div className="flex-1 rounded-xl border p-4">
                <p className="font-semibold">
                  {isFirst
                    ? "SOS Started"
                    : isLast
                      ? "Latest Location"
                      : `Location ${index + 1}`}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {typeof location.createdAt === "string"
                    ? location.createdAt
                    : new Intl.DateTimeFormat("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "medium",
                      }).format(new Date(location.createdAt))}
                </p>

                <p className="mt-2 text-sm">
                  {location.latitude.toFixed(6)},{" "}
                  {location.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
