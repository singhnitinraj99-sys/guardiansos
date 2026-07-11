"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl: string | null;
  createdAt: Date;

  _count: {
    contacts: number;
    logs: number;
  };

  logs: {
    createdAt: Date;
    status: string;
  }[];
}

interface Props {
  users: User[];
}

export default function UsersTable({
  users,
}: Props) {
  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contacts</TableHead>
            <TableHead>SOS</TableHead>
            <TableHead>Last SOS</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-10 text-center"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}

          {users.map((user) => {
            const lastSOS = user.logs[0];

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        user.imageUrl ??
                        "/default-avatar.png"
                      }
                      alt={user.firstName ?? "User"}
                      width={42}
                      height={42}
                      className="rounded-full"
                    />

                    <div>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {user.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {user._count.contacts}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge>
                    {user._count.logs}
                  </Badge>
                </TableCell>

                <TableCell>
                  {lastSOS ? (
                    <Badge
                      variant={
                        lastSOS.status === "SENT"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {lastSOS.status}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    asChild
                    size="sm"
                  >
                    <Link
                      href={`/admin/users/${user.id}`}
                    >
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}