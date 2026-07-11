"use client";

import Image from "next/image";
import {
  Calendar,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  user: {
    id: string;
    clerkId: string;
    firstName: string | null;
    lastName: string |null;
    email: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;

    _count: {
      contacts: number;
      logs: number;
      callLogs: number;
    };
  };
}

export default function UserProfileCard({
  user,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Image
            src={
              user.imageUrl ??
              "/default-avatar.png"
            }
            alt={user.firstName ?? "User"}
            width={90}
            height={90}
            className="rounded-full border"
          />

          <div className="space-y-1">
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>

            <Badge>
              Active User
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />

            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />

            <span>{user.clerkId}</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />

            <span>
              Joined{" "}
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </span>
          </div>

        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-lg  border p-4 text-center">
            <Shield className="mx-auto mb-2 h-5 w-5 text-red-500" />

            <p className="text-2xl font-bold">
              {user._count.logs}
            </p>

            <p className="text-xs text-muted-foreground">
              SOS
            </p>
          </div>

          <div className="rounded-lg border p-4 text-center">
            <Phone className="mx-auto mb-2 h-5 w-5 text-blue-500" />

            <p className="text-2xl font-bold">
              {user._count.contacts}
            </p>

            <p className="text-xs text-muted-foreground">
              Contacts
            </p>
          </div>

          <div className="rounded-lg border p-4 text-center">
            <User className="mx-auto mb-2 h-5 w-5 text-green-500" />

            <p className="text-2xl font-bold">
              {user._count.callLogs}
            </p>

            <p className="text-xs text-muted-foreground">
              Calls
            </p>
          </div>

        </div>

        <Separator />

        <div className="space-y-2 text-sm text-muted-foreground">

          <p>
            <strong>Created :</strong>{" "}
            {new Date(
              user.createdAt
            ).toLocaleString()}
          </p>

          <p>
            <strong>Updated :</strong>{" "}
            {new Date(
              user.updatedAt
            ).toLocaleString()}
          </p>

        </div>

      </CardContent>
    </Card>
  );
}