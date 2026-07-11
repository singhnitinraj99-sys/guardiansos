import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface Incident {
  id: string;
  status: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
}

interface Props {
  incidents: Incident[];
}

export default function RecentIncidents({
  incidents,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent SOS Incidents</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {incidents.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No incidents found.
          </p>
        )}

        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <p className="font-medium">
                {incident.user.firstName}{" "}
                {incident.user.lastName}
              </p>

              <p className="text-sm text-muted-foreground">
                {incident.user.email}
              </p>
            </div>

            <div className="text-right">
              <Badge>
                {incident.status}
              </Badge>

              <p className="mt-2 text-xs text-muted-foreground">
                {incident.createdAt.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}