"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  currentPage: number;
  totalPages: number;
  search?: string;
}

export default function UserPagination({
  currentPage,
  totalPages,
  search = "",
}: Props) {
  if (totalPages <= 1) return null;

  function pageLink(page: number) {
    const params = new URLSearchParams();

    params.set("page", page.toString());

    if (search) {
      params.set("search", search);
    }

    return `/admin/users?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-between">
      <Button
        asChild
        variant="outline"
        disabled={currentPage === 1}
      >
        <Link href={pageLink(currentPage - 1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Link>
      </Button>

      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>

      <Button
        asChild
        variant="outline"
        disabled={currentPage === totalPages}
      >
        <Link href={pageLink(currentPage + 1)}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}