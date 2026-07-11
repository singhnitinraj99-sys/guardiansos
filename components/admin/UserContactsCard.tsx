"use client";

import {
  Phone,
  Star,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  priority: number;
  isPrimary: boolean;
  createdAt: Date;
}

interface Props {
  contacts: Contact[];
}

export default function UserContactsCard({
  contacts,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-red-500" />
          Emergency Contacts
        </CardTitle>

        <Badge variant="outline">
          {contacts.length} Contact{contacts.length !== 1 && "s"}
        </Badge>
      </CardHeader>

      <CardContent>
        {contacts.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">
            No emergency contacts found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>

                <TableHead>Phone</TableHead>

                <TableHead>Relation</TableHead>

                <TableHead>Priority</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Added</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">
                    {contact.name}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {contact.phone}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {contact.relation}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {contact.priority}
                  </TableCell>

                  <TableCell>
                    {contact.isPrimary ? (
                      <Badge>
                        <Star className="mr-1 h-3 w-3 fill-current" />
                        Primary
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Secondary
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      contact.createdAt
                    ).toLocaleDateString()}
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
