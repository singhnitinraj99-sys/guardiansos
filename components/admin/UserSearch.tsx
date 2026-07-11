"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  defaultValue?: string;
}

export default function UserSearch({
  defaultValue = "",
}: Props) {
  const [value, setValue] = useState(defaultValue);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const searchParams = useSearchParams();

  function search(keyword: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (keyword.trim()) {
      params.set("search", keyword);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`/admin/users?${params.toString()}`);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        

        <Input
          value={value}
          disabled={isPending}
          placeholder="Search by name or email..."
          className="pl-10"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(value);
            }
          }}
        />
      </div>

      <Button
        disabled={isPending}
        onClick={() => search(value)}
      >
        Search
      </Button>

      {value && (
        <Button
          variant="outline"
          onClick={() => {
            setValue("");
            search("");
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}