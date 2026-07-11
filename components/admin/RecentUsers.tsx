import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@base-ui/react";

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl: string | null;
  createdAt: Date;
}

interface Props {
  users: User[];
}

export default function RecentUsers({ users }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4  ">
        {users.length === 0 && (
          <p className="text-sm text-muted-foreground">No users found.</p>
        )}

        {users.map((user) => (
          <div
            key={user.id}
            className="flex  items-center justify-between rounded-lg border p-6"
          >
            <div className="flex items-center gap-3 ">
              <Image
                src={user.imageUrl ?? "/default-avatar.png"}
                alt={user.firstName ?? "User"}
                width={45}
                height={45}
                className="rounded-full"
              />

              <div>
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>

                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {user.createdAt.toLocaleDateString()}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
