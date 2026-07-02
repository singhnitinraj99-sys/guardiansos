"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteContact } from "@/actions/contact.actions";

interface Props {
  id: string;
}

export default function DeleteButton({ id }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          try {
            await deleteContact(id);
            toast.success("Contact deleted");
          } catch (error) {
            toast.error(
              error instanceof Error ? error.message : "Something went wrong"
            );
          }
        })
      }
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
}
