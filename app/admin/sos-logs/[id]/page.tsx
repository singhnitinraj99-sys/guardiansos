import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getSOSLog } from "@/actions/admin-sos.actions";

import PageHeader from "@/components/shared/PageHeader";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function SOSLogPage({
  params,
}: Props) {
  const { id } = await params;

  const log = await getSOSLog(id);

  return (
    <div className="space-y-6">
      
      <PageHeader
        title="SOS Incident"
        description={log.user.email}
      />

      <Card>
        <CardHeader>
          <CardTitle>
            Incident Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p>
            <strong>Status:</strong>{" "}
            <Badge>{log.status}</Badge>
          </p>

          <p>
            <strong>User:</strong>{" "}
            {log.user.firstName} {log.user.lastName}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(log.createdAt).toLocaleString()}
          </p>

          <p>
            <strong>Latitude:</strong>{" "}
            {log.latitude ?? "-"}
          </p>

          <p>
            <strong>Longitude:</strong>{" "}
            {log.longitude ?? "-"}
          </p>

          {log.latitude && log.longitude && (
            <Button
              asChild
              variant="outline"
            >
              <Link
                target="_blank"
                href={`https://maps.google.com/?q=${log.latitude},${log.longitude}`}
              >
                Open in Google Maps
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Emergency Calls
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {log.calls.length === 0 && (
            <p>No calls found.</p>
          )}

          {log.calls.map((call) => (
            <div
              key={call.id}
              className="rounded-lg border p-4"
            >
              <p>
                <strong>Contact:</strong>{" "}
                {call.contactName}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {call.phone}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {call.status}
              </p>

              <p>
                <strong>Attempt:</strong>{" "}
                {call.attempt}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {call.duration ?? 0}s
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Live Location History
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {log.liveLocations.length === 0 && (
            <p>No live locations recorded.</p>
          )}

          {log.liveLocations.map((location) => (
            <div
              key={location.id}
              className="rounded-lg border p-4"
            >
              <p>
                <strong>Latitude:</strong>{" "}
                {location.latitude}
              </p>

              <p>
                <strong>Longitude:</strong>{" "}
                {location.longitude}
              </p>

              <p>
                <strong>Accuracy:</strong>{" "}
                {location.accuracy ?? "-"}
              </p>

              <p>
                <strong>Speed:</strong>{" "}
                {location.speed ?? "-"}
              </p>

              <p>
                <strong>Heading:</strong>{" "}
                {location.heading ?? "-"}
              </p>

              <p>
                <strong>Recorded:</strong>{" "}
                {new Date(
                  location.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}