import { createGoogleMapsLink } from "@/lib/maps";

interface Props {
  incident: any;
}

export default function LocationCard({
  incident,
}: Props) {
  if (
    incident.latitude == null ||
    incident.longitude == null
  ) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          📍 Location
        </h2>

        <p className="text-gray-500">
          No GPS location was captured.
        </p>
      </div>
    );
  }

  const mapUrl = createGoogleMapsLink(
    incident.latitude,
    incident.longitude
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        📍 Emergency Location
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">
            Latitude
          </p>

          <p className="font-medium">
            {incident.latitude}
          </p>

          <div className="mt-5" />

          <p className="text-sm text-gray-500">
            Longitude
          </p>

          <p className="font-medium">
            {incident.longitude}
          </p>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Open in Google Maps
          </a>
        </div>

        <iframe
          className="h-72 w-full rounded-xl border"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${incident.latitude},${incident.longitude}&z=15&output=embed`}
        />
      </div>
    </div>
  );
}