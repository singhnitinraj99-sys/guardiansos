import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getAdminUser } from "@/actions/admin-users.actions";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";

import UserProfileCard from "@/components/admin/UserProfileCard";
import UserSettingsCard from "@/components/admin/UserSettingsCard";
import UserContactsCard from "@/components/admin/UserContactsCard";
import UserSOSHistory from "@/components/admin/UserSOSHistory";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminUserPage({
  params,
}: Props) {
  const { id } = await params;

  const user = await getAdminUser(id);

  return (
    <div className="space-y-6">
      <Button
        asChild
        variant="outline"
        className="w-fit"
      >
        <Link href="/admin/users">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      <PageHeader
        title={`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "User"}
        description={user.email}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <UserProfileCard user={user} />

        <UserSettingsCard settings={user.settings} />
      </div>

      <UserContactsCard contacts={user.contacts} />

      <UserSOSHistory logs={user.logs} />
    </div>
  );
}