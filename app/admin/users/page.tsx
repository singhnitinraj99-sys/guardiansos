import { ArrowLeft } from "lucide-react";
import Link from "next/link";



import PageHeader from "@/components/shared/PageHeader";

import { Button } from "@/components/ui/button";

import UsersTable from "@/components/admin/UsersTable";
import UserSearch from "@/components/admin/UserSearch";
import UserPagination from "@/components/admin/UserPagination";
import { getUsers } from "@/actions/users.actions";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function AdminUsersPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const search = params.search ?? "";

  const data = await getUsers({
    page,
    search,
  });

  return (
    <div className="space-y-6">
      <Button
        asChild
        variant="outline"
        className="w-fit"
      >
        <Link href="/admin">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <PageHeader
        title="Users"
        description="Manage all GuardianSOS users"
      />

      <UserSearch defaultValue={search} />

      <UsersTable users={data.users} />

      <UserPagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        search={search}
      />
    </div>
  );
}