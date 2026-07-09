import {
  Route,
  Clock3,
  Gauge,
  MapPinned,
} from "lucide-react";

interface Props {
  stats: {
    distance: number;
    duration: number;
    averageSpeed: number;
    gpsPoints: number;
  };
}

const cards = [
  {
    title: "Distance",
    key: "distance",
    icon: Route,
    suffix: " km",
  },
  {
    title: "Duration",
    key: "duration",
    icon: Clock3,
    suffix: " min",
  },
  {
    title: "Avg Speed",
    key: "averageSpeed",
    icon: Gauge,
    suffix: " km/h",
  },
  {
    title: "GPS Points",
    key: "gpsPoints",
    icon: MapPinned,
    suffix: "",
  },
] as const;

export default function RouteStats({
  stats,
}: Props) {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        const value = stats[
          card.key
        ] as number;

        return (
          <div
            key={card.title}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <Icon className="h-6 w-6 text-red-600" />
            </div>

            <p className="text-sm text-muted-foreground">
              {card.title}
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {card.key === "gpsPoints"
                ? value
                : value.toFixed(2)}
              {card.suffix}
            </h3>
          </div>
        );
      })}
    </section>
  );
}