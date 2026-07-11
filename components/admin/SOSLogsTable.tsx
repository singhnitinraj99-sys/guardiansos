"use client";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

interface Props {
  logs: any[];
}

export default function SOSLogsTable({
  logs,
}: Props) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Calls</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                {log.user.firstName} {log.user.lastName}
              </TableCell>

              <TableCell>
                <Badge>{log.status}</Badge>
              </TableCell>

              <TableCell>
                {log.calls.length}
              </TableCell>

              <TableCell>
                {log.latitude && log.longitude
                  ? "Available"
                  : "No Location"}
              </TableCell>

              <TableCell>
                {new Date(
                  log.createdAt
                ).toLocaleString()}
              </TableCell>

              <TableCell className="text-right">
                <Button asChild size="sm">
                  <Link
                    href={`/admin/sos-logs/${log.id}`}
                  >
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {logs.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center"
              >
                No SOS logs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}