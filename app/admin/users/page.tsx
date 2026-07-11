
import PageHeader from "@/components/shared/PageHeader";



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