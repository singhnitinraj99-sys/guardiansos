"use client";

import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SOSLog {
  id: string;
  status: "PENDING" | "SENT" | "FAILED" | "OFFLINE";
  latitude: number | null;
  longitude: number | null;
  message: string | null;
  createdAt: Date;
}

interface Props {
  logs: SOSLog[];
}

export default function UserSOSHistory({
  logs,
}: Props) {
  function getBadge(status: SOSLog["status"]) {
    switch (status) {
      case "SENT":
        return (
          <Badge className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Sent
          </Badge>
        );

      case "FAILED":
        return (
          <Badge
            variant="destructive"
            className="gap-1"
          >
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        );

      case "OFFLINE":
        return (
          <Badge
            variant="secondary"
            className="gap-1"
          >
            <Activity className="h-3 w-3" />
            Offline
          </Badge>
        );

      default:
        return (
          <Badge
            variant="outline"
            className="gap-1"
          >
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          SOS History
        </CardTitle>

        <Badge variant="outline">
          {logs.length} Incident
          {logs.length !== 1 && "s"}
        </Badge>
      </CardHeader>

      <CardContent>
        {logs.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">
            No SOS incidents found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>

                <TableHead>Date</TableHead>

                <TableHead>Location</TableHead>

                <TableHead>Message</TableHead>

                <TableHead className="text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {getBadge(log.status)}
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <p>
                        {new Date(
                          log.createdAt
                        ).toLocaleDateString()}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          log.createdAt
                        ).toLocaleTimeString()}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    {log.latitude &&
                    log.longitude ? (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-red-500" />

                        <span>
                          {log.latitude.toFixed(4)},
                          {" "}
                          {log.longitude.toFixed(4)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        —
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="max-w-xs">
                    <p className="truncate">
                      {log.message ??
                        "No message"}
                    </p>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                    >
                      <Link
                        href={`/admin/incidents/${log.id}`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}